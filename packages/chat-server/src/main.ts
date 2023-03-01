import express from 'express';
import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { config } from 'dotenv';

type Message = {
  id: string;
  content: string;
};

interface ServerToClientEvents {
  message: (message: Message) => void;
}

interface ClientToServerEvents {
  message: (message: string) => void;
}

config();

const app = express();
const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log(`Connection established with ${socket.id}`);
  socket.on('message', (message) => {
    console.log(`Message received from ${socket.id}: ${message}`);
    io.emit('message', {
      id: uuidv4(),
      content: message,
    });
  });
});

const pubClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});
const subClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient));

io.listen(parseInt(process.env.PORT) || 3333);
