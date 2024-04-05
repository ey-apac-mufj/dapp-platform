import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Localhost, Sepolia } from "@thirdweb-dev/chains";
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
import { LoginProvider } from "./contexts/LoginContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./language/i18n";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    {/* Thirdweb provider for blockchain activities */}
    <ThirdwebProvider
      supportedChains={[Sepolia]} // test network
      activeChain={activeChain}
      supportedWallets={[
        smartWallet(metamaskWallet(), {
          factoryAddress: TWFactoryAddress,
          gasless: true,
        }),
        smartWallet(
          web3AuthWallet({
            chain: Sepolia,
            clientId: "BPZ4m6p1fN1IMpHcED6JK54kAlqFIqTjEvEWrJmh_Ip9ITQQBbLVl55j9USbyGNtKrdQmFCQjhqTCUdFPa154Bk",
          }),
          {
            factoryAddress: TWFactoryAddress,
            gasless: true,
          }
        )
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
