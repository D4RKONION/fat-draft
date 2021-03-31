const express = require("express");
const http = require("http");
var crypto = require("crypto");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


io.on("connection", (socket) => {
  console.log("New client connected");
  socket.userName = `${socket.handshake.headers.username}#${getRandomInt(1000, 10000)}`;
  socket.roomCode = socket.handshake.headers.roomcode ? socket.handshake.headers.roomcode : crypto.randomBytes(3).toString('hex').toUpperCase();

  
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      userName: socket.userName,
      roomCode: socket.roomCode,
    });
  }
  const requstedRoomCode = io.of("/").adapter.rooms.get(socket.roomCode);
  
  if (requstedRoomCode && requstedRoomCode.size > 1) {
    // there's too many people in the room!
    console.log("There's too many people in the room!")
    socket.roomCode = "";
    socket.emit("event://room-full", "soz");
  } else if (requstedRoomCode && requstedRoomCode.size === 1) {
    // let the opponent know someone has arrived
    const waitingUser = users.filter(userObj => userObj.roomCode === socket.roomCode && userObj.userName !== socket.userName);
    console.log("you've joined a room");
    socket.emit("event://room-joined", {userName: socket.userName, roomCode: socket.roomCode, opponentName: waitingUser[0].userName});
    socket.to(socket.roomCode).emit('event://opponent-joined', {opponentName: socket.userName});
    socket.join(socket.roomCode);
    io.to(socket.roomCode).emit('data://draft-characters', ["Ryu", "Ken", "Akuma", "Guile", "Abigail", "Chun-Li", "Blanka", "Ed"]);
    if (getRandomInt(1, 3) === 1) {
      socket.emit("request://ban-character");
    } else {
      socket.to(socket.roomCode).emit("request://ban-character");
    }
  } else {
    // first person to join the room, wait for an opponent
    console.log("you're the first person in the room")
    socket.join(socket.roomCode);
    socket.emit("event://room-created", {userName: socket.userName, roomCode: socket.roomCode});
  }

  // a user has banned a character
  // let the other user know which character, and request a ban from them
  socket.on("user://ban-character", (characterName) => {
    socket.to(socket.roomCode).emit('data://banned-character', characterName);
    socket.to(socket.roomCode).emit('request://ban-character');
  })
  
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));