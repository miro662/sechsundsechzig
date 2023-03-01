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

export const clientMessage: (user: string, content: string) => ClientMessage = (
  user,
  content
) => ({
  type: 'client_message',
  id: uuidv4(),
  user,
  content,
  date: new Date(),
});

export const serverMessage: (user: string) => ServerMessage = (content) => ({
  type: 'server_message',
  id: uuidv4(),
  content,
  date: new Date(),
});

export function serialize(message: Message): string {
  return JSON.stringify(message);
}

export function deserialize(payload: string): Message {
  const parsed = JSON.parse(payload);
  // TODO: proper checks
  return { ...parsed, date: new Date(parsed.date) };
}
