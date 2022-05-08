import {
  RainbowKitProvider,
  apiProvider,
  configureChains,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider, chain, createClient } from "wagmi";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />{" "}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default MyApp;
