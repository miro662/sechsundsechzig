import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Messages from '../components/Messages';
import Prompt from '../components/Prompt';
import { useAppContext } from '../context/app';
import { Message } from '../lib/chat';

const channel = 'chat';

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatClient } = useAppContext();

  useEffect(() => {
    if (chatClient != null) {
      chatClient.registerOnMessageCallback((message) =>
        setMessages((messages) => [...messages, message])
      );
    }
  }, [chatClient]);

  return (
    <Layout>
      <Head>
        <title>#{channel}</title>
      </Head>
      <h1>#{channel}</h1>
      <Messages messages={messages} />
      <Prompt onSendMessage={(message) => chatClient.sendMessage(message)} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      chatClientUrl: process.env.CHAT_SERVER_URL,
    },
  };
};
