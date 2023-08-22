import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Goerli, Localhost } from "@thirdweb-dev/chains";
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
  TWClientID,
  TWFactoryAddress,
  activeChain,
  magicLinkKey,
  walletConnetKey,
} from "../const/yourDetails";
import { walletConnectV1 } from "@thirdweb-dev/react";
import { LoginProvider } from "./contexts/LoginContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    {/* Thirdweb provider for blockchain activities */}
    <ThirdwebProvider
      supportedChains={[Goerli]} // test network
      activeChain={activeChain}
      supportedWallets={[
        // myWallet(),
        metamaskWallet(),
        smartWallet({
          // Smart contract wallet is the only supported wallet
          factoryAddress: TWFactoryAddress,
          // secretKey: TWApiKey,
          clientId: TWClientID,
          gasless: true,
          personalWallets: [
            // Smart contract wallet requires a personal wallet to work
            metamaskWallet(),
            // magicLink({
            //   apiKey: magicLinkKey,
            //   magicSdkConfiguration: {
            //     network: "goerli",
            //   },
            // }),
            // myWallet(),
            walletConnectV1({ projectId: walletConnetKey }),
            localWallet({ persist: true }),
          ],
        }),
        // paperWallet({
        //   clientId: "5e8b0e46-c434-4a92-a2f1-4f0e7ecd9888",
        // }),
      ]}
    >
      <LoginProvider>
        <App />
      </LoginProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
