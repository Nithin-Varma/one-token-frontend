import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom/client";

import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { sepolia, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, polygonMumbai],
  [alchemyProvider({
    apiKey: "z9xzfmxaZkYiqOqNwBNfG0Hu6IBqPLN8"
  }),
  alchemyProvider({
    apiKey: "HF4M_M-GmS3kW_tVGbR2PEr_xYd1L2zA",
  })
  ],
)
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

// fonts
import "@fontsource/plus-jakarta-sans/latin.css";

import { theme } from "lib/styles/theme";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>

  </React.StrictMode>
);
