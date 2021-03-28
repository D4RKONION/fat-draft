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

  console.log(users);
  console.log(socket.roomCode)
  const requstedRoomCode = io.of("/").adapter.rooms.get(socket.roomCode)
  if (requstedRoomCode && requstedRoomCode.size > 1) {
    // there's too many people in the room!
    console.log("There's too many people in the room!")
    socket.roomCode = "";
    socket.emit("event://room-full", "soz");
  } else {
    socket.join(socket.roomCode);
    socket.emit("event://room-joined", {userName: socket.userName, roomCode: socket.roomCode});
  }
  
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));