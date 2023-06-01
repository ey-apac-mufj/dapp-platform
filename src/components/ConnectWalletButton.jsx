import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function ConnectWalletButton() {
  return (
    <div className="mx-auto mb-10 pt-4">
      <ConnectWallet
        dropdownPosition={{
          align: "right",
          side: "bottom",
        }}
        btnTitle="Connect Wallet"
      />
    </div>
  );
}
