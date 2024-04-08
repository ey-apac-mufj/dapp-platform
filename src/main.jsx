import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ArbitrumSepolia, Localhost } from "@thirdweb-dev/chains";
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
import { web3AuthWallet } from "./web3auth/web3auth";
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
import { I18nextProvider } from "react-i18next";
import i18n from "./language/i18n";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    {/* Thirdweb provider for blockchain activities */}
    <ThirdwebProvider
      supportedChains={[ArbitrumSepolia]} // test network
      activeChain={activeChain}
      supportedWallets={[
        // myWallet(),
        // metamaskWallet(),
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
            // walletConnectV1({ projectId: walletConnetKey }),
            // localWallet({ persist: true }),
            web3AuthWallet({
              chain: ArbitrumSepolia,
              clientId: "BPZ4m6p1fN1IMpHcED6JK54kAlqFIqTjEvEWrJmh_Ip9ITQQBbLVl55j9USbyGNtKrdQmFCQjhqTCUdFPa154Bk",
            }),
            walletConnect({
              projectId: "b91f7534a3ea99e0f1afac67c7d5ec1d"
            }),
          ],
        }),
        // paperWallet({
        //   clientId: "5e8b0e46-c434-4a92-a2f1-4f0e7ecd9888",
        // }),
      ]}
    >
      <I18nextProvider i18n={i18n}>
        <LoginProvider>
          <App />
        </LoginProvider>
      </I18nextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
