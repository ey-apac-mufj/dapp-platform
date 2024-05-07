import React from "react";
import wallet from "../images/wallet.png";
import community from "../images/community.png";
import googleplay from "../images/googleplay.png";
import appstore from "../images/appstore.png";
import { Link } from "react-router-dom";
import SwitchLanguage from "../components/SwitchLanguage";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation();
  return (
    <>
      {/* <div className="w-100 bg-black">sfdd</div> */}
      <div className="container mx-auto px-5 md:px-20 py-5 justify-center landing-page">
        {/* Wallet section starts */}
        <div className="grid grid-cols-1 md:grid-cols-2 antonFont mx-auto">
          <div className="mt-5 py-3 px-5">
            <h1 className="text-4xl uppercase">{t("EDI Platform")}</h1>
            <div>
              <Link to="/login">
                <button className="pink-button uppercase mt-8 text-xl font-thin">
                  Enter
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-8 py-3 px-5 order-first md:order-none">
            <img src={community} className="mx-auto h-87 shadow-lg" alt="" />
          </div>
        </div>

        {/* Wallet section ends */}

        {/* Community section starts */}
        <div className="grid grid-cols-1 md:grid-cols-2 antonFont mx-auto">
          <div className="mt-10 py-3 px-5 order-first md:order-none">
            <img src={wallet} className="h-87 shadow-lg" alt="" />
          </div>
          <div className="mt-5 md:mt-10 py-3 px-5 ml-4">
            <h1 className="text-4xl uppercase ">{t("Web3 Wallet")}</h1>
            <div>
              <h2 className="mt-6 mb-3 text-xl">{t("Get your own")}</h2>
              <div className="flex gap-3">
                <a href="https://play.google.com/store/apps" target="_blank">
                  <img
                    src={googleplay}
                    className="h-10 cursor-pointer"
                    alt=""
                  />
                </a>
                <a href="https://www.apple.com/app-store/" target="_blank">
                  <img src={appstore} className="h-10 cursor-pointer" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Community section ends */}
      </div>
      <SwitchLanguage />
    </>
  );
}
