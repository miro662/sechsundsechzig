import { ClientMessage, Message, serialize } from 'chat-protocol';
import ws from 'ws';
import { WebsocketRequestHandler } from 'express-ws';
import { v4 as uuidv4 } from 'uuid';
import { Channel } from './Channel';
import {
  ChannelProtocolMessage,
  ClientMessageSent,
  UserJoined,
} from './ChannelProtocol';

function makeid(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function WebSocketHandler(channel: Channel<ChannelProtocolMessage>) {
  return (ws) => {
    const client = new Client(ws, channel);
    client.start();
  };
}

class Client {
  private username: string;
  private ws: ws;
  private channel: Channel<ChannelProtocolMessage>;

  constructor(ws: ws, channel: Channel<ChannelProtocolMessage>) {
    this.ws = ws;
    this.channel = channel;
    this.username = makeid(8);
  }

  start() {
    this.channel.subscribe((message) => this.handleChannelMessage(message));
    this.ws.on('message', (msg) => this.handleWebsocketMessage(msg));

    this.sendServerMessageToClient(`${this.username}, welcome to #chat!`);
    this.channel.publish({
      type: 'user_joined',
      username: this.username,
    });
  }

  private sendToClient(message: Message) {
    this.ws.send(serialize(message));
  }

  private sendServerMessageToClient(message: string) {
    this.sendToClient({
      type: 'server_message',
      id: uuidv4(),
      content: message,
      date: new Date(),
    });
  }

  // Channel handlers

  private handleChannelMessage(message: ChannelProtocolMessage) {
    switch (message.type) {
      case 'user_joined':
        this.handleUserJoined(message);
        break;
      case 'client_message_sent':
        this.handleClientMessageSent(message);
        break;
    }
  }

  private handleUserJoined(message: UserJoined) {
    this.sendServerMessageToClient(`${message.username} has joined the #chat!`);
  }

  private handleClientMessageSent(message: ClientMessageSent) {
    console.log(
      `[${this.username}] Received message from channel: "${message.id}}"`
    );
    // eslint-disable-next-line no-case-declarations
    const clientMessage: ClientMessage = {
      ...message,
      date: new Date(message.date),
      user: message.username,
      type: 'client_message',
    };
    this.sendToClient(clientMessage);
  }

  // Websocket handlers

  private handleWebsocketMessage(msg: ws.RawData) {
    const msgString: string = msg.toString();
    this.handleNewMessage(msgString);
  }

  private handleNewMessage(message: string) {
    if (message.startsWith('/')) {
      this.handleCommand(message);
    } else if (message !== '') {
      this.sendMessage(message);
    }
  }

  // Actions

  private sendMessage(message: string) {
    console.log(`Received message "${message.toString()}"`);
    this.channel.publish({
      type: 'client_message_sent',
      id: uuidv4(),
      username: this.username,
      content: message,
      date: new Date().toString(),
    });
  }

  private handleCommand(message: string) {
    const command = null;
    if (command === null) {
      console.log(`Received unknown command "${message}"`);
      this.sendServerMessageToClient(`unknown command: ${message}`);
    }
  }
}
