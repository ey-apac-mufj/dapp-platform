import React, { useState } from "react";
import CommunityThumbnail from "./components/CommunityThumbnail";
import logo from "./images/logo.png";
import com1 from "./images/com1.png";
import com2 from "./images/com2.png";
import com3 from "./images/com3.png";
import com4 from "./images/com4.png";
import insta from "./images/insta.png";
import twitter from "./images/twitter.png";
import { editionDropAddress, editionDropTokenId } from "../const/yourDetails";
import ConnectWalletButton from "./components/ConnectWalletButton";
import {
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyMembership from "./components/BuyMembership";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Landing() {
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
  ];
  const address = useAddress();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // For modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // console.log(address);
  const { contract: editionDropContract } = useContract(editionDropAddress);
  const { data: nft, isLoading: isNftLoading } = useNFT(
    editionDropContract,
    editionDropTokenId
  );
  const { data: ownedNfts, refetch: refetchOwnedNfts } = useOwnedNFTs(
    editionDropContract,
    address
  );

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
        {communities.map((com, i) => {
          return (
            <div className="community" key={i}>
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
      <BuyMembership
        open={open}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        address={address}
        editionDropAddress={editionDropAddress}
        editionDropTokenId={editionDropTokenId}
        refetchOwnedNfts={refetchOwnedNfts}
        ownedNfts={ownedNfts}
        isNftLoading={isNftLoading}
        nft={nft}
      />
    </div>
  );
}
