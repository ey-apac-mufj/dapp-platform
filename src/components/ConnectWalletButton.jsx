import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function ConnectWalletButton({ customClass = "" }) {
  return (
    <div className="mx-auto mb-5 pt-4">
      <ConnectWallet
        dropdownPosition={{
          align: "right",
          side: "bottom",
        }}
        className={customClass} // custom styles passed by props
        btnTitle="Connect Wallet"
      />
    </div>
  );
}
