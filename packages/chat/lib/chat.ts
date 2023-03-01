export type Message = {
  id: string;
  content: string;
};

export type Messages = Message[];

type MessageCallback = (message: Message) => void;

export class ChatClient {
  onMessageCallback: MessageCallback;
  socket: WebSocket;

  constructor(server: string) {
    this.socket = new WebSocket(server);
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data) as Message;
      if (this.onMessageCallback != null) {
        this.onMessageCallback(message);
      }
    });
  }

  public registerOnMessageCallback(callback: MessageCallback): void {
    this.onMessageCallback = callback;
  }

  public sendMessage(content: string): void {
    this.socket.send(content);
  }
}
