import { GetStaticProps } from 'next';
import { AppProps } from 'next/app';
import { AppContextProvider } from '../components/AppContextProvider';
import { Roboto_Mono } from '@next/font/google';
import './styles.sass';

const robotoMono = Roboto_Mono({ subsets: ['latin'] });

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppContextProvider chatClientUrl={pageProps.chatClientUrl}>
        <Component {...pageProps} />
      </AppContextProvider>
      <style jsx global>{`
        html {
          font-family: ${robotoMono.style.fontFamily};
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      chatClientUrl: process.env.CHAT_CLIENT_URL,
    },
  };
};
