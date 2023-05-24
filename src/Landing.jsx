import React from "react";
import CommunityThumbnail from "./components/CommunityThumbnail";
import logo from "./images/logo.png";
import com1 from "./images/com1.png";
import com2 from "./images/com2.png";
import com3 from "./images/com3.png";
import com4 from "./images/com4.png";
import insta from "./images/insta.png";
import twitter from "./images/twitter.png";
import ConnectWalletButton from "./components/ConnectWalletButton";

export default function Landing() {
  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center landing-page">
      <img src={logo} alt="" className="mx-auto w-30" />
      <h3 className="mt-5 text-3xl font-semi-bold text-red-900">
        Web3 Community Platform
      </h3>
      <input
        type="text"
        className="w-90 md:w-80 mt-5 ml-2 pl-5 pr-3 py-2 rounded-full text-center"
        placeholder="Search Community"
      />
      <div className="stat-section w-100 mx-4 md:mx-20 mt-14 mb-7 px-3 md:px-8 pb-8 rounded-2xl text-white shadow-xl">
        <div>
          <ConnectWalletButton />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="md:border-r-2 md:border-white py-5">
            <h5 className="museoFont">Communities</h5>
            <h5 className="museoFont">149</h5>
          </div>
          <div className="md:border-r-2 md:border-white py-5">
            <h5 className="museoFont">Ambassadors</h5>
            <h5 className="museoFont">55</h5>
          </div>
          <div className="md:border-r-2 md:border-white py-5">
            <h5 className="museoFont">Metaverse</h5>
            <h5 className="museoFont">5</h5>
          </div>
          <div className="py-5">
            <h5 className="museoFont">SBT Drops</h5>
            <h5 className="museoFont">13</h5>
          </div>
        </div>
      </div>
      <hr className="h-1 bg-gray-500" />
      <h5 className="text-2xl mt-4 gray-color font-semi-bold">
        Featured Communities
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-6 mx-auto">
        <div className="community">
          <CommunityThumbnail image={com1} />
        </div>
        <div className="community">
          <CommunityThumbnail image={com2} />
        </div>
        <div className="community">
          <CommunityThumbnail image={com3} />
        </div>
        <div className="community">
          <CommunityThumbnail image={com4} />
        </div>
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-2 my-3">
        <div className="left-section mr-auto text-left flex gap-4">
          <h5>Privacy Policy</h5>
          <h5>Terms of Use</h5>
          <h5>Help</h5>
        </div>
        <div className="right-section ml-auto flex gap-4">
          <img src={insta} alt="" className="h-8" />
          <img src={twitter} alt="" className="h-8" />
        </div>
      </div>
    </div>
  );
}
