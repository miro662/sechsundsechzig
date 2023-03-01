import { createContext, useContext } from 'react';
import { ChatClient } from '../lib/chat';

export type AppContextProps = {
  chatClient?: ChatClient;
};

export const AppContext = createContext<AppContextProps>({});

export function useAppContext() {
  return useContext(AppContext);
}
