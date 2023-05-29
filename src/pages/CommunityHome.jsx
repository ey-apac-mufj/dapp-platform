import React, { useRef } from "react";
import CommunityThumbnail from "../components/CommunityThumbnail";
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

  const featuredCommunity = useRef();
  const yourCommunity = useRef();

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

  const scrollLeft = (divRef) => {
    // setInterval(function () {
    //   featuredCommunity.current.scrollBy(-20, 0);
    // }, 2);
    divRef.current.scrollBy(-500, 0);
  };

  const scrollRight = (divRef) => {
    // setInterval(function () {
    //   featuredCommunity.current.scrollBy(20, 0);
    // }, 2);
    divRef.current.scrollBy(500, 0);
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
      <div className="grid gid-cols-1 md:grid-cols-2">
        <div className="mr-auto">
          <h5 className="text-2xl mt-6 text-black text-left font-semi-bold antonFont">
            Your Communities
          </h5>
        </div>
        <div className="ml-auto flex pt-4 hidden md:inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-4 cursor-pointer"
            onClick={() => scrollLeft(yourCommunity)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => scrollRight(yourCommunity)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      <div
        className="flex overflow-x-auto mt-6 mb-9 gap-6 scrolling"
        ref={yourCommunity}
      >
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
      <div className="grid gid-cols-1 md:grid-cols-2">
        <div className="mr-auto">
          <h5 className="text-2xl mt-6 text-black text-left font-semi-bold antonFont">
            Featured Communities
          </h5>
        </div>
        <div className="ml-auto flex pt-4 hidden md:inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-4 cursor-pointer"
            onClick={() => scrollLeft(featuredCommunity)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => scrollRight(featuredCommunity)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      <div
        className="flex overflow-x-auto mt-6 mb-9 gap-6 scrolling"
        ref={featuredCommunity}
      >
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
