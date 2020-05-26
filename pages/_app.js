import '@/css/tailwind.css';
import '@/css/prism-nord.css';
import Head from 'next/head';
import Layout from '@/components/Layout';
import SEO from '@/next-seo.config';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...SEO} />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
