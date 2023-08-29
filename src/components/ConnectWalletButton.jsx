import React, { useContext, useEffect } from "react";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { LoginContext } from "../contexts/LoginContext";

export default function ConnectWalletButton({ customClass = "" }) {
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
      setLoggedInStatus(false);
      handleMediLogout();
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
        btnTitle="Connect Wallet"
      />
    </div>
  );
}
