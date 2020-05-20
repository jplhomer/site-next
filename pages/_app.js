import "@/css/tailwind.css";
import Head from "next/head";
import { useRouter } from "next/router";
import PostLayout from "@/components/PostLayout";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <ConditionalWrapper>
          <Component {...pageProps} />
        </ConditionalWrapper>
      </Layout>
    </>
  );
}

function ConditionalWrapper({ children }) {
  const router = useRouter();

  if (/^\/posts\/\w+/.test(router.pathname)) {
    // TODO: Replace with real blog layout
    return <PostLayout>{children}</PostLayout>;
  }

  return children;
}
