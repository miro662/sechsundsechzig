import express from 'express';
import expressWs from 'express-ws';
import { config } from 'dotenv';
import Redis from 'ioredis';
import { RedisChannelBackend } from './RedisChannelBackend';
import { WebSocketHandler } from './WebSocketHandler';
import { Channel } from './Channel';
import { ChannelProtocolMessage } from './ChannelProtocol';

config();

export const redis = new Redis();
const channel = new Channel<ChannelProtocolMessage>(new RedisChannelBackend());
const wsApp = expressWs(express());
const app = wsApp.app;
const handler = WebSocketHandler(channel);

app.ws('/', handler);
app.listen(parseInt(process.env.PORT) || 3333);
