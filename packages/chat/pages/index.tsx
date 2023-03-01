import { useEffect, useState } from 'react';
import Prompt from '../components/prompt';
import { io } from 'socket.io-client';

type Message = {
  id: string;
  content: string;
};

type Messages = Message[];

const socket = io('ws://localhost:3333');

export default function Index() {
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    socket.on('message', (message: Message) => {
      console.log(JSON.stringify(message));
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <>
      <h1>Hello, world!</h1>
      <div>
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>{msg.content}</li>
          ))}
        </ul>
      </div>
      <Prompt
        onSendMessage={(content) => {
          socket.emit('message', content);
        }}
      />
    </>
  );
}
