import React from "react";
import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
  ThirdwebSDK,
} from "@thirdweb-dev/react";
import {
  editionDropAddress,
  editionDropTokenId,
} from "../../const/yourDetails";
import profileContractDetails from "../contract-details/Profile.json";
import profileAddress from "../contract-details/contract-address.json";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function ConnectWalletButton() {
  const address = useAddress();

  return (
    <div className="mx-auto mb-10 pt-4">
      <ConnectWallet
        dropdownPosition={{
          align: "right",
          side: "bottom",
        }}
        theme="light"
        btnTitle="Connect Wallet"
      />
      {/* <button className="px-5 py-3 bg-pink-600 mt-4 rounded-xl shadow-lg">
        Connect Wallet
      </button> */}
    </div>
  );
}
