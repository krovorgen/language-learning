import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/scss/index.scss';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dictionary</title>
        <meta property="og:title" content="Dictionary" key="title" />
      </Head>
      <ToastContainer
        position="bottom-left"
        theme="dark"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
