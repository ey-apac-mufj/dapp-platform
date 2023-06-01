import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function ConnectWalletButton() {
  const showMUFGWallet = () => {
    // console.log("asasd");
    window.showMUFG();
  };
  return (
    <div className="mx-auto mb-10 pt-4" onClick={showMUFGWallet}>
      <ConnectWallet
        dropdownPosition={{
          align: "right",
          side: "bottom",
        }}
        btnTitle="Connect Wallet"
      />
      {/* <button className="px-5 py-3 bg-pink-600 mt-4 rounded-xl shadow-lg">
        Connect Wallet
      </button> */}
    </div>
  );
}
