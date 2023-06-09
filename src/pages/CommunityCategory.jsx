import { useAddress } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommunityThumbnail from "../components/CommunityThumbnail";
import ConnectWalletButton from "../components/ConnectWalletButton";
import com2 from "../images/com2.png";
import com3 from "../images/com3.png";
import com1 from "../images/com1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CommunityCategory() {
  let { category } = useParams();
  const address = useAddress();
  const navigate = useNavigate();
  const communities = [
    {
      id: 3,
      image: com3,
      title: "Medi-LX",
      active: true,
    },
    {
      id: 4,
      image: com1,
      title: "Education 2",
      active: false,
    },
    {
      id: 4,
      image: com2,
      title: "Education 3",
      active: false,
    },
    {
      id: 5,
      image: com3,
      title: "Education 4",
      active: false,
    },
  ];

  const handleCommunityRedirect = () => {
    if (!address || address === undefined) {
      // Check if wallet is connected or not
      toast.error("Please connect your wallet first!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      return navigate("/community-details");
    }
  };

  useEffect(() => {
    window.showMUFG();
  }, []);
  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center landing-page bg-gray-100 h-full">
      <h3 className="mt-5 text-3xl font-semi-bold text-black antonFont mb-7">
        Health Care Communitites
      </h3>
      <div className="mx-auto">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mt-8">
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
      <ToastContainer />
    </div>
  );
}
