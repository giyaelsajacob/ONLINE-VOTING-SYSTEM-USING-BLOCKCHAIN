import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Chain } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { sepolia } from "@wagmi/core/chains";

const shardeum: Chain = {
  id: 11155111,
  name: "Sepolia test network",
  network: "Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.infura.io/v3/"],
    },
    public: { http: [""] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: true,
};

const { chains, provider } = configureChains([sepolia], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
