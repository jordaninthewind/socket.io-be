require("dotenv").config();

const express = require("express");
const http = require("http");

const { URL, PORT } = process.env;

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("MESSAGE", (msg) => {
    io.emit("MESSAGE", msg);
  });

  socket.on("SEND_JOIN_REQUEST", (msg) => {
    io.emit("JOIN_REQUEST_ACCEPTED");
  });
});

server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
