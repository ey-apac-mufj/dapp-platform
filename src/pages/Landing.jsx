import React from "react";
import wallet from "../images/wallet.png";
import community from "../images/community.png";
import googleplay from "../images/googleplay.png";
import appstore from "../images/appstore.png";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <>
      <Header />
      {/* <div className="w-100 bg-black">sfdd</div> */}
      <div className="container mx-auto px-5 md:px-20 py-5 justify-center landing-page">
        {/* Wallet section starts */}
        <div className="grid grid-cols-1 md:grid-cols-2 antonFont mx-auto">
          <div className="mt-5 py-3 px-5">
            <h1 className="text-4xl uppercase">Multiverse Communities</h1>
            <p className="mt-5 text-sm font-thin">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. <br />{" "}
              <span className="underline cursor-pointer">Learn More</span>
            </p>
            <div>
              <Link to="/community-home">
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
            <h1 className="text-4xl uppercase ">Web3 Wallet</h1>
            <p className="mt-5 text-sm font-thin">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. <br />{" "}
              <span className="underline cursor-pointer">Learn More</span>
            </p>
            <div>
              <h2 className="mt-6 mb-3 text-xl">Get your own</h2>
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
      <Footer />
    </>
  );
}
