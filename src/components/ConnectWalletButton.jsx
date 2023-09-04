import React, { useContext, useEffect } from "react";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { LoginContext } from "../contexts/LoginContext";
import { useTranslation } from "react-i18next";

export default function ConnectWalletButton({ customClass = "" }) {
  const { t } = useTranslation();
  const connectionStatus = useConnectionStatus();

  const { setLoggedInStatus } = useContext(LoginContext);

  const handleMediLogout = async () => {
    let logout = await fetch("https://medi-lx.xyz/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
    let logoutRes = await logout.json();
    console.log(logoutRes);
  };

  useEffect(() => {
    if (connectionStatus === "disconnected") {
      console.log("yess disconnected");
      setLoggedInStatus(false);
      handleMediLogout();
    } else {
      setLoggedInStatus(true);
    }
  }, [connectionStatus]);

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
