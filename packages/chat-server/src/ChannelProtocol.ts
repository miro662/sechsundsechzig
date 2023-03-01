export interface ClientMessageSent {
  type: 'client_message_sent';
  id: string;
  username: string;
  content: string;
  date: string;
}

export interface UserJoined {
  type: 'user_joined';
  username: string;
}

export type ChannelProtocolMessage = ClientMessageSent | UserJoined;
