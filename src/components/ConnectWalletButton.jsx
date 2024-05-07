import React from "react";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { useTranslation } from "react-i18next";

export default function ConnectWalletButton({ customClass = "" }) {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mb-5 pt-4">
      <ConnectWallet
        dropdownPosition={{
          align: "right",
          side: "bottom",
        }}
        className={customClass} // custom styles passed by props
        btnTitle={t("Connect Wallet")}
      />
    </div>
  );
}
