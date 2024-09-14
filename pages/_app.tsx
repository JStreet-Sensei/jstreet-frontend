import { AppProps } from 'next/app';
import '../styles/globals.css';
import { Layout } from '../components/Layouts';
import { SessionProvider } from 'next-auth/react';
import Seo from '@/components/Seo';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Seo></Seo>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
export default MyApp;
