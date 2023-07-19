import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'ui/normalize.css';
import 'ui/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="favicon.svg" color="#000000" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
