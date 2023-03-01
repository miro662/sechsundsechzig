import express from 'express';
import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import {v4 as uuidv4} from 'uuid';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on("connection", (socket: Socket) => {
  console.log(`Connection established with ${socket.id}`)
  socket.on("message", message => {
    console.log(`Message received from ${socket.id}: ${message}`);
    io.emit("message", {
      id: uuidv4(),
      content: message
    })
  })
});

server.listen(3333);
server.on('error', console.error);
