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


io.on("connection", (socket) => {
  console.log("New client connected");
  socket.userName = socket.handshake.headers.username;
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

  
  socket.emit("room joined", socket.roomCode);
  socket.join(socket.roomCode);
  
  socket.on("add user", userName => {
    socket.emit("add user success", "hi");
  })
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));