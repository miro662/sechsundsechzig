export type ChannelBackend = {
  publish: (message: string | Buffer) => void;
  subscribe: (callback: (message: string | Buffer) => void) => void;
};

export class Channel<T> {
  backend: ChannelBackend;

  constructor(backend: ChannelBackend) {
    this.backend = backend;
  }

  public publish(message: T) {
    this.backend.publish(JSON.stringify(message));
  }

  public subscribe(callback: (message: T) => void) {
    this.backend.subscribe((msg) => callback(JSON.parse(msg.toString())));
  }
}
