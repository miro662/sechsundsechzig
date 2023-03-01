import { ClientMessage, Message, ServerMessage } from 'chat-protocol';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useReducer, useState } from 'react';
import Layout from '../components/Layout';
import Messages, { Item } from '../components/Messages';
import Prompt from '../components/Prompt';
import { useAppContext } from '../context/app';

const channel = 'chat';

interface State {
  connected: boolean;
  items: Item[];
}

interface ActionConnectionChanged {
  type: 'connection_changed';
  newStatus: boolean;
}

interface ClientMessageRecieved {
  type: 'client_message_recieved';
  clientMessage: ClientMessage;
}

interface ServerMessageRecieved {
  type: 'server_message_recieved';
  serverMessage: ServerMessage;
}

type Action =
  | ActionConnectionChanged
  | ClientMessageRecieved
  | ServerMessageRecieved;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'connection_changed':
      return { ...state, connected: action.newStatus };
    case 'client_message_recieved':
      return {
        ...state,
        items: [
          ...state.items,
          {
            type: 'messsage',
            id: action.clientMessage.id,
            user: action.clientMessage.user,
            content: action.clientMessage.content,
            date: action.clientMessage.date,
          },
        ],
      };
    case 'server_message_recieved':
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.serverMessage, type: 'server_notification' },
        ],
      };
  }
}

export default function Index() {
  const [state, dispatch] = useReducer(reducer, {
    connected: false,
    items: [],
  });
  const { chatClient } = useAppContext();

  useEffect(() => {
    if (chatClient != null) {
      chatClient.registerClientMessageCallback((message) =>
        dispatch({
          type: 'client_message_recieved',
          clientMessage: message,
        })
      );
      chatClient.registerServerMessageCallback((message) =>
        dispatch({
          type: 'server_message_recieved',
          serverMessage: message,
        })
      );
    }
  }, [chatClient]);

  return (
    <Layout>
      <Head>
        <title>{'#' + channel}</title>
      </Head>
      <h1>#{channel}</h1>
      <Messages items={state.items} />
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
