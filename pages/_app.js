import '@/css/tailwind.css';
import '@/css/prism.css';
import Head from 'next/head';
import Layout from '@/components/Layout';
import SEO from '@/next-seo.config';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${
            Component.favicon ?? '📝'
          }</text></svg>`}
        ></link>
      </Head>
      <DefaultSeo {...SEO} />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
