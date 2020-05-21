import '@/css/tailwind.css';
import '@/css/prism-nord.css';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
