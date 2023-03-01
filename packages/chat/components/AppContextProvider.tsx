import { AppContext } from '../context/app';
import { ChatClient } from '../lib/chat';
import { PropsWithChildren, useEffect, useState } from 'react';

export function AppContextProvider({
  children,
  chatClientUrl,
}: PropsWithChildren<{ chatClientUrl: string }>) {
  const [sharedState, setSharedState] = useState({
    chatClient: null,
  });

  useEffect(() => {
    setSharedState({
      chatClient: new ChatClient(chatClientUrl),
    });
  }, [chatClientUrl]);

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
