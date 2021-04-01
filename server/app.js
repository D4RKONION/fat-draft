const express = require("express");
const http = require("http");
var crypto = require("crypto");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const GAME_DETAILS = require("./constants/GameDetails.js");

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
const tickers = {
  8: ["B1", "B2", "P1", "P2", "P2", "P1", "Q"]
}
const roomsData = {}

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

  console.log(roomsData);
  
  if (requstedRoomCode && requstedRoomCode.size > 1) {
    // there's too many people in the room!
    console.log("There's too many people in the room!")
    socket.roomCode = "";
    socket.emit("event://room-full", "soz");

  } else if (requstedRoomCode && requstedRoomCode.size === 1) {

    // fetch the waiting user's data, assign pick position and join the room
    const waitingUser = users.filter(userObj => userObj.roomCode === socket.roomCode && userObj.userName !== socket.userName);
    roomsData[socket.roomCode].playerTwo ? roomsData[socket.roomCode].playerOne = socket.id : roomsData[socket.roomCode].playerTwo = socket.id;
    console.log("you've joined a room");
    socket.emit("event://room-joined", {userName: socket.userName, roomCode: socket.roomCode, opponentName: waitingUser[0].userName});
    socket.join(socket.roomCode);

    // let the opponent know someone has arrived and join the room
    socket.to(socket.roomCode).emit('event://opponent-joined', {opponentName: socket.userName});
    

    // send both players the draft list, tell player1 to choose and player2 to standby
    io.to(socket.roomCode).emit('data://draft-characters', roomsData[socket.roomCode].draftCharacters);
    io.to(roomsData[socket.roomCode].playerOne).emit("request://ban-character");
    roomsData[socket.roomCode].tickerPosition++;

  } else {
    // first person to join the room, wait for an opponent
    console.log("you're the first person in the room")
    socket.join(socket.roomCode);
    socket.emit("event://room-created", {userName: socket.userName, roomCode: socket.roomCode});

    // set up the room data
    roomsData[socket.roomCode] = {
      "draftCharacters": GAME_DETAILS["SFV"].characterList.sort(() => Math.random() - Math.random()).slice(0, 8),
      "tickerPosition": 0,
      "playerOne": "",
      "playerTwo": "",
    }

    // decide whether it's player one or player two
    getRandomInt(1, 3) === 1 ? roomsData[socket.roomCode].playerOne = socket.id : roomsData[socket.roomCode].playerTwo = socket.id;

  }

  // a user has banned a character. Let the other user know
  // which character, and request an action from the next player
  socket.on("user://select-character", (data) => {
    console.log(data)
    socket.to(socket.roomCode).emit(`data://${data.selectionType}-character`, data.characterName);
    
    const nextAction = tickers[8][roomsData[socket.roomCode].tickerPosition];

    if (nextAction.includes("B")) {
      if (nextAction.includes("1")) {
        io.to(roomsData[socket.roomCode].playerOne).emit("request://ban-character");
      } else {
        io.to(roomsData[socket.roomCode].playerTwo).emit("request://ban-character");
      }
    } else if (nextAction.includes("P")) {
      if (nextAction.includes("1")) {
        io.to(roomsData[socket.roomCode].playerOne).emit("request://pick-character");
      } else {
        io.to(roomsData[socket.roomCode].playerTwo).emit("request://pick-character");
      }
    } else if (nextAction.includes("Q")) {
      io.to(socket.roomCode).emit(`event://draft-finished`);
    }
    roomsData[socket.roomCode].tickerPosition++;
  })
  
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    if (socket.id === roomsData[socket.roomCode].playerOne) {
      roomsData[socket.roomCode].playerOne = "";
    } else if (socket.id === roomsData[socket.roomCode].playerTwo) {
      roomsData[socket.roomCode].playerTwo = "";
    }

    if (roomsData[socket.roomCode].playerOne === "" & roomsData[socket.roomCode].playerTwo === "") {
      delete roomsData[socket.roomCode];
    }
    console.log(roomsData);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));