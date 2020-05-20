import "@/css/tailwind.css";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConditionalWrapper>
        <Component {...pageProps} />
      </ConditionalWrapper>
    </>
  );
}

function ConditionalWrapper({ children }) {
  const router = useRouter();

  if (/^\/posts\/\w+/.test(router.pathname)) {
    // TODO: Replace with real blog layout
    return <div className="max-w-md mx-auto">{children}</div>;
  }

  return children;
}
