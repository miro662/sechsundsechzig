import { deserialize, ClientMessage, ServerMessage } from 'chat-protocol';

type ClientMessageCallback = (message: ClientMessage) => void;
type ServerMessageCallback = (message: ServerMessage) => void;

export class ChatClient {
  clientMessageCallback?: ClientMessageCallback;
  serverMessageCallback?: ServerMessageCallback;
  socket: WebSocket;

  constructor(server: string) {
    this.socket = new WebSocket(server);
    this.socket.addEventListener('message', (event) => {
      console.log('xD');
      const message = deserialize(event.data);
      switch (message.type) {
        case 'client_message':
          if (this.clientMessageCallback != null) {
            this.clientMessageCallback(message);
          }
          break;
        case 'server_message':
          if (this.serverMessageCallback != null) {
            this.serverMessageCallback(message);
          }
          break;
      }
    });
  }

  public registerClientMessageCallback(callback: ClientMessageCallback): void {
    this.clientMessageCallback = callback;
  }

  public registerServerMessageCallback(callback: ServerMessageCallback): void {
    this.serverMessageCallback = callback;
  }

  public sendMessage(content: string): void {
    this.socket.send(content);
  }
}
