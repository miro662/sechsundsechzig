import { Socket, io } from 'socket.io-client';

export type Message = {
  id: string;
  content: string;
};

export type Messages = Message[];

const MessageEvent = 'message';

export class ChatClient {
  socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:3333');
  }

  public registerOnMessageCallback(callback: (Message) => void): void {
    this.socket.off(MessageEvent);
    this.socket.on(MessageEvent, (message: Message) => {
      callback(message);
    });
  }

  public sendMessage(content: string): void {
    this.socket.emit(MessageEvent, content);
  }
}
