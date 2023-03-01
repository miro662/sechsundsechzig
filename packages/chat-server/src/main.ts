import express from 'express';
import expressWs from 'express-ws';
import { config } from 'dotenv';
import Redis from 'ioredis';
import { RedisChannel } from './RedisChannel';
import { WebSocketHandler } from './WebSocketHandler';

config();

export const redis = new Redis();
const channel = new RedisChannel();
const wsApp = expressWs(express());
const app = wsApp.app;
const handler = WebSocketHandler(channel);

app.ws('/', handler);
app.listen(parseInt(process.env.PORT) || 3333);
