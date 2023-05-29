import React from "react";
import CommunityThumbnail from "../components/CommunityThumbnail";
import logo from "../images/logo.png";
import com1 from "../images/com1.png";
import com2 from "../images/com2.png";
import com3 from "../images/com3.png";
import com4 from "../images/com4.png";
import insta from "../images/insta.png";
import twitter from "../images/twitter.png";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { useAddress } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Stat from "../components/Stat";

export default function CommunityHome() {
  const communities = [
    {
      id: 1,
      image: com1,
      title: "Bokemon Learn and Play",
    },
    {
      id: 2,
      image: com2,
      title: "Acics Running",
    },
    {
      id: 3,
      image: com3,
      title: "Nurse Circle",
    },
    {
      id: 4,
      image: com4,
      title: "Virtual Apparel",
    },
    {
      id: 4,
      image: com3,
      title: "Demo Community 1",
    },
    {
      id: 4,
      image: com2,
      title: "Demo Community 2",
    },
    {
      id: 4,
      image: com1,
      title: "Demo Community 3",
    },
  ];
  const address = useAddress();
  const navigate = useNavigate();

  const handleCommunityRedirect = () => {
    if (!address || address === undefined) {
      // Check if wallet is connected or not
      toast.error("Please connect your wallet first!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      return navigate("/community-details");
      // // Check if user already has the NFT or not
      // // if(ownedNfts)
      // console.log(ownedNfts);
      // if (ownedNfts && ownedNfts.length > 0) {
      //   console.log("hi man");
      //   return navigate("/community-details");
      // } else {
      //   onOpenModal();
      // }
    }
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center landing-page">
      {/* <img src={logo} alt="" className="mx-auto w-30" /> */}
      <h3 className="mt-5 text-3xl font-semi-bold text-black antonFont">
        Multiverse Community
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
          <Stat title="Communities" number="149" />
          <Stat title="Ambassadors" number="55" />
          <Stat title="Metaverse" number="5" />
          <Stat title="SBT Drops" number="13" border={false} />
        </div>
      </div>

      {/* Your Communities */}
      <hr className="h-1 bg-gray-500" />
      <h5 className="text-2xl mt-6 text-left text-black font-semi-bold antonFont">
        Your Communities
      </h5>
      <div className="flex overflow-x-auto mt-6 mb-9 gap-6 scrolling">
        {communities.map((com, i) => {
          if (i < 2) {
            return (
              <div className="community flex-none" key={i}>
                <CommunityThumbnail
                  community={com}
                  handleCommunityRedirect={handleCommunityRedirect}
                />
              </div>
            );
          }
        })}
      </div>

      {/* featured Communities */}
      <hr className="h-1 bg-gray-500" />
      <h5 className="text-2xl mt-6 text-black text-left font-semi-bold antonFont">
        Featured Communities
      </h5>
      <div className="flex overflow-x-auto mt-6 mb-9 gap-6 scrolling">
        {communities.map((com, i) => {
          return (
            <div className="community flex-none" key={i}>
              <CommunityThumbnail
                community={com}
                handleCommunityRedirect={handleCommunityRedirect}
              />
            </div>
          );
        })}
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
      <ToastContainer />
    </div>
  );
}
