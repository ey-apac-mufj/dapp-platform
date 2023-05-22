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
} from "@thirdweb-dev/react";
import "./styles/globals.css";
import { TWApiKey, TWFactoryAddress, activeChain } from "../const/yourDetails";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      supportedChains={[Goerli]}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet({
          factoryAddress: TWFactoryAddress,
          thirdwebApiKey: TWApiKey,
          gasless: true,
          personalWallets: [
            metamaskWallet(),
            magicLink({
              apiKey: "pk_live_41D75AEA3BB94386",
              magicSdkConfiguration: {
                network: "goerli",
              },
            }),
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
