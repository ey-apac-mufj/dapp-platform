import React, { useRef, useEffect, useState, useContext } from "react";
import {
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import {
  editionDropAddress,
  editionDropTokenId,
} from "../../const/yourDetails";
import CommunityThumbnail from "../components/CommunityThumbnail";
import com1 from "../images/com1.png";
import com2 from "../images/com2.png";
import com3 from "../images/ecommerse.jpg";
import com4 from "../images/com4.png";
import insta from "../images/insta.png";
import twitter from "../images/twitter.png";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Stat from "../components/Stat";
import CategoryThumbnail from "../components/CategoryThumbnail";

import { useTranslation } from "react-i18next";
import SwitchLanguage from "../components/SwitchLanguage";

export default function CommunityHome() {
  const { t } = useTranslation();
  const [lastClick, setLastClick] = useState(Date.now());
  const [nftPresent, setNftPresent] = useState(false);

  useEffect(() => {
    const onClick = () => {
      setLastClick(Date.now());
    };

    document.addEventListener("click", onClick);

    return () => {
      // cleanup - remove the listener when the component unmounts
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    window.showMUFG();
  }, [lastClick]);

  // Dummy community data
  const communities = [
    {
      id: 3,
      image: com3,
      title: "Medi - LX",
      active: true,
    },
    {
      id: 1,
      image: com1,
      title: "Bokemon Learn and Play",
      active: false,
    },
    {
      id: 2,
      image: com2,
      title: "Acics Running",
      active: false,
    },
    {
      id: 4,
      image: com4,
      title: "Virtual Apparel",
      active: false,
    },
    {
      id: 4,
      image: com3,
      title: "Demo Community 1",
      active: false,
    },
    {
      id: 4,
      image: com2,
      title: "Demo Community 2",
      active: false,
    },
    {
      id: 4,
      image: com1,
      title: "Demo Community 3",
      active: false,
    },
  ];

  // Dummy categories
  const categories = [
    {
      id: 2,
      title: "Education",
      slug: "education",
      active: true,
      image: com1,
    },
    {
      id: 1,
      title: "ECommerse",
      slug: "ecommerse",
      active: false,
      image: com3,
    },
    {
      id: 3,
      title: "Sport",
      slug: "sport",
      active: false,
      image: com2,
    },
    {
      id: 4,
      title: "Fashion",
      slug: "fashion",
      active: false,
      image: com4,
    },
  ];

  const address = useAddress();
  const navigate = useNavigate();

  const communityCategory = useRef();
  const yourCommunity = useRef();

  const handleCommunityRedirect = () => {
    // if wallet is not connected show error message else redirect to community details page
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

  const scrollHorizontal = (divRef, direction) => {
    // setInterval(function () {
    //   communityCategory.current.scrollBy(-20, 0);
    // }, 2);
    if (direction == "left") {
      divRef.current.scrollBy(-500, 0);
    } else {
      divRef.current.scrollBy(500, 0);
    }
  };

  const { contract: editionDropContract } = useContract(editionDropAddress);

  const { data: ownedNfts, refetch: refetchOwnedNfts } = useOwnedNFTs(
    editionDropContract,
    address
  );

  const checkIfHaveNft = () => {
    // Check if wallet has the required NFT or not
    // console.log(address);
    if (address) {
      if (ownedNfts && ownedNfts?.length > 0) {
        setTimeout(() => {
          setNftPresent(true);
          // console.log("yes");
        }, 100);
      }
    } else {
      setNftPresent(false);
    }
  };

  // useEffect(() => {
  //   checkIfHaveNft();
  // }, [address]);

  useEffect(() => {
    checkIfHaveNft();
  }, [ownedNfts]);

  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center landing-page">
      {/* <img src={logo} alt="" className="mx-auto w-30" /> */}
      <h3 className="mt-5 text-3xl font-semi-bold text-black antonFont">
        {t("Multiverse Community")}
      </h3>
      {/* <button onClick={() => changeLanguage()}>Toggle Language</button> */}
      <input
        type="text"
        className="w-90 md:w-80 mt-5 ml-2 pl-5 pr-3 py-2 rounded-full text-center"
        placeholder={t("Search Community")}
      />
      <div className="stat-section w-100 mx-4 md:mx-20 mt-14 mb-7 px-3 md:px-8 pb-8 rounded-2xl text-white shadow-xl">
        <div>
          {/* Show connect wallet button */}
          <ConnectWalletButton />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat title={t("Communities")} number="149" />
          <Stat title={t("Ambassadors")} number="55" />
          <Stat title={t("Metaverse")} number="5" />
          <Stat title={t("SBT Drops")} number="13" border={false} />
        </div>
      </div>

      {/* featured Communities */}
      <hr className="h-1 bg-gray-500" />
      <div className="grid gid-cols-1 md:grid-cols-2 max-w-full">
        <div className="mr-auto">
          <h5 className="text-2xl mt-6 text-black text-left font-semi-bold antonFont">
            {t("Community Categories")}
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
            onClick={() => scrollHorizontal(communityCategory, "left")}
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
            onClick={() => scrollHorizontal(communityCategory, "right")}
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
        className="flex overflow-x-auto mt-6 mb-9 gap-6 scrolling mx-auto"
        ref={communityCategory}
      >
        {categories.map((cat, i) => {
          return (
            <div className="community flex-none" key={i}>
              {/* Show category thumbnail for each category */}
              <CategoryThumbnail category={cat} t={t} />
            </div>
          );
        })}
      </div>

      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-2 my-3 max-w-full">
        <div className="left-section mr-auto text-left flex gap-4">
          <h5>{t("Privacy Policy")}</h5>
          <h5>{t("Terms of Use")}</h5>
          <h5>{t("Help")}</h5>
        </div>
        <div className="right-section ml-auto flex gap-4">
          <img src={insta} alt="" className="h-8" />
          <img src={twitter} alt="" className="h-8" />
        </div>
      </div>
      <ToastContainer />
      <SwitchLanguage />
    </div>
  );
}
