import { createContext, useContext } from 'react';
import { ChatClient } from '../lib/chat';

type AppContextProps = {
  chatClient?: ChatClient;
};

const AppContext = createContext<AppContextProps>({});

export function AppContextProvider({ children }) {
  const sharedState = {
    chatClient: new ChatClient(),
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
