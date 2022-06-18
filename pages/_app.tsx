import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../scss/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dictionary</title>
        <meta property="og:title" content="Dictionary" key="title" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
