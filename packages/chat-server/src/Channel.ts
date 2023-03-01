export type Channel = {
  publish: (message: string | Buffer) => void;
  subscribe: (callback: (message: string | Buffer) => void) => void;
};
