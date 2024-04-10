import React, { useState, useEffect, useContext } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { useAddress } from "@thirdweb-dev/react";
import { LoginContext } from "../contexts/LoginContext";
import { Link } from "react-router-dom";
import SwitchLanguage from "../components/SwitchLanguage";
import { useTranslation } from "react-i18next";

export default function DummyEDIHome() {
  const address = useAddress();
  const { t } = useTranslation();

  const { loggedInStatus } = useContext(LoginContext);

  return (
    <>
      <nav className="w-full bg-gray-200 shadow">
        <div className="px-5 md:items-center md:flex md:justify-between">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/" className="cursor-pointer">
              <h5 className="font-bold text-purple-500 text-xl">
                {t("EDI Platform")}
              </h5>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
        <h5 className="font-medium text-2xl">{t("EDI Dummy Functions")}</h5>
        <div className="mx-auto mt-4">
          <ConnectWalletButton customClass="connectWalletButton" />
        </div>
        <hr className="h-1 bg-gray-500" />
        {address ? (<div style={{ marginTop: "20px" }}>
          <button className="pink-button px-2 py-2 mb-2">
            Send Delivery Order
          </button>　
          <button className="pink-button px-2 py-2">
            Send Delivery Note
          </button>　
          <button className="pink-button px-2 py-2">
            Send Invoice
          </button>　
          <button className="pink-button px-2 py-2">
            Send Payment Notification
          </button>
        </div>
        ) : (
          <div className="bg-red-300 w-full p-5 m-5 text-center text-xl">
            {t(
              "Please connect wallet to continue"
            )}
          </div>
        )}
      </div>
      <SwitchLanguage />
    </>
  );
}
