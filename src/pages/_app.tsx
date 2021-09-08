import Head from "next/head";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { Toaster } from "react-hot-toast";

import "@reach/dialog/styles.css";
import "../styles/globals.css";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nextjs DApp</title>
        <meta name="description" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
      </Head>

      <Toaster position="top-right" />

      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>
  );
}

export default App;
