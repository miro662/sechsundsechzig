import { v4 as uuidv4 } from 'uuid';
import { Message } from './protocol';

export function WebSocketHandler(channel) {
  return (ws) => {
    channel.subscribe((message) => ws.send(message));
    ws.on('message', (msg) => {
      const message: Message = {
        id: uuidv4(),
        content: msg.toString(),
      };
      channel.publish(JSON.stringify(message));
    });
  };
}
