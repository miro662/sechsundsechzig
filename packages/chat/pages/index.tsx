import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Prompt from '../components/Prompt';
import { useAppContext } from '../context/app';
import { Messages } from '../lib/chat';

export default function Index() {
  const [messages, setMessages] = useState<Messages>([]);
  const { chatClient } = useAppContext();

  useEffect(() => {
    if (chatClient != null) {
      chatClient.registerOnMessageCallback((message) =>
        setMessages((messages) => [...messages, message])
      );
    }
  }, [chatClient]);

  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <h1>Hello, world!</h1>
      <div>
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>{msg.content}</li>
          ))}
        </ul>
      </div>
      <Prompt onSendMessage={(message) => chatClient.sendMessage(message)} />
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      chatClientUrl: process.env.CHAT_SERVER_URL,
    },
  };
};
