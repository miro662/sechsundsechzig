import { AppContext } from '../context/app';
import { ChatClient } from '../lib/chat';
import { PropsWithChildren } from 'react';

export function AppContextProvider({
  children,
  chatClientUrl,
}: PropsWithChildren<{ chatClientUrl: string }>) {
  const sharedState = {
    chatClient: new ChatClient(chatClientUrl),
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
