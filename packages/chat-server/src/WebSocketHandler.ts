import { clientMessage, serialize, serverMessage } from 'chat-protocol';

function parseCommand(message: str): null {
  return null;
}

export function WebSocketHandler(channel) {
  return (ws) => {
    channel.subscribe((message) => ws.send(message));
    channel.publish(serialize(serverMessage('welcome to #channel!')));
    ws.on('message', (msg) => {
      const msgString: string = msg.toString();
      if (msgString.startsWith('/')) {
        const command = parseCommand(msgString);
        if (command === null) {
          channel.publish(
            serialize(serverMessage(`unknown command: ${msgString}`))
          );
        }
      } else if (msgString !== '') {
        console.log(`Received message "${msg.toString()}"`);
        channel.publish(serialize(clientMessage('anonymous', msg)));
      }
    });
  };
}
