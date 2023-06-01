import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Goerli } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  paperWallet,
  smartWallet,
  magicLink,
  ChainId,
  walletConnect,
} from "@thirdweb-dev/react";
import "./styles//globals.css";
import {
  TWApiKey,
  TWFactoryAddress,
  activeChain,
  magicLinkKey,
  walletConnetKey,
} from "../const/yourDetails";
import { walletConnectV1 } from "@thirdweb-dev/react";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      supportedChains={[Goerli]}
      activeChain={activeChain}
      supportedWallets={[
        // myWallet(),
        smartWallet({
          factoryAddress: TWFactoryAddress,
          thirdwebApiKey: TWApiKey,
          gasless: true,
          personalWallets: [
            metamaskWallet(),
            magicLink({
              apiKey: magicLinkKey,
              magicSdkConfiguration: {
                network: "goerli",
              },
            }),
            // myWallet(),
            walletConnectV1({ projectId: walletConnetKey }),
            localWallet({ persist: true }),
          ],
        }),
        paperWallet({
          clientId: "5e8b0e46-c434-4a92-a2f1-4f0e7ecd9888",
        }),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
