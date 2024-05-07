import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ArbitrumSepolia, Localhost } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  smartWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "./styles//globals.css";
import {
  TWClientID,
  TWFactoryAddress,
  activeChain,
} from "../const/yourDetails";
import { I18nextProvider } from "react-i18next";
import i18n from "./language/i18n";
import { googleWeb3Wallet } from "./web3auth/web3auth-no-modal";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    {/* Thirdweb provider for blockchain activities */}
    <ThirdwebProvider
      supportedChains={[ArbitrumSepolia]} // test network
      activeChain={activeChain}
      supportedWallets={[
        smartWallet({
          // Smart contract wallet is the only supported wallet
          factoryAddress: TWFactoryAddress,
          clientId: TWClientID,
          gasless: true,
          personalWallets: [
            googleWeb3Wallet({
              chain: ArbitrumSepolia,
              clientId:
                "BPZ4m6p1fN1IMpHcED6JK54kAlqFIqTjEvEWrJmh_Ip9ITQQBbLVl55j9USbyGNtKrdQmFCQjhqTCUdFPa154Bk",
            }),
            walletConnect({
              projectId: "b91f7534a3ea99e0f1afac67c7d5ec1d",
            }),
          ],
        }),
      ]}
    >
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
