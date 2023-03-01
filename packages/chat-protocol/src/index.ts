import { v4 as uuidv4 } from 'uuid';

export type ClientMessage = {
  type: 'client_message';
  id: string;
  user: string;
  content: string;
  date: Date;
};

export type ServerMessage = {
  type: 'server_message';
  id: string;
  content: string;
  date: Date;
};

export type Message = ClientMessage | ServerMessage;

export function serialize(message: Message): string {
  return JSON.stringify(message);
}

export function deserialize(payload: string): Message {
  const parsed = JSON.parse(payload);
  // TODO: proper checks
  return { ...parsed, date: new Date(parsed.date) };
}
