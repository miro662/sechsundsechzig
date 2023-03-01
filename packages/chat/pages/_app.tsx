import { GetStaticProps } from 'next';
import { AppProps } from 'next/app';
import { AppContextProvider } from '../components/AppContextProvider';

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider chatClientUrl={pageProps.chatClientUrl}>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      chatClientUrl: process.env.CHAT_CLIENT_URL,
    },
  };
};
