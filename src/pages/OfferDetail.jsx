import React, { useState, useEffect, useContext } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";
import { useSDK } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import OfferAPI from "../apiCall/OfferAPI";
import Login from "../apiCall/Login";
import { useParams } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  splitMainAddress,
  splitDestinations,
  splitPercentages,
  stablecoinAddress,
  platformAddress,
  splitABI,
} from "../../const/yourDetails";
import Navbar from "../components/Navbar";
import { LoginContext } from "../contexts/LoginContext";

export default function OfferDetail() {
  let { offerId } = useParams();
  const sdk = useSDK(); // Get SDK
  const address = useAddress();
  const [user, setUser] = useState(null);

  const [offer, setOffer] = useState(null);
  const [onChainOffer, setOnChainOffer] = useState(null);

  const [open, setOpen] = useState(false); // For modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const { loggedInStatus, setLoggedInStatus } = useContext(LoginContext);

  const [inputs, setInputs] = useState({}); // For form

  async function getOffer() {
    if (offerId) {
      const splitMainContract = await sdk.getContract(
        splitMainAddress,
        splitABI
      );
      const offerOnChain = await splitMainContract.call("getOffer", [offerId]);
      console.log("offer on blockchain", offerOnChain);
      setOnChainOffer(offerOnChain);
      const res = await OfferAPI.getOffer(offerId);
      if (res.status === 200) {
        setOffer(res.data);
        console.log(res.data);
      } // otherwise Medi API returns { status: 404, data: [], message: "not_offer_error" }
    }
  }
  useEffect(() => {
    getOffer();
  }, [offerId]);

  useEffect(() => {
    if (offer) {
      setInputs((values) => ({ ...values, jobDescription: offer.offerDetail }));
    }
  }, [offer]);

  const getUser = async () => {
    const res = await Login.getUser();
    if (res.status === 200) {
      setUser(res.data);
      console.log(res.data);
      setLoggedInStatus(true);
    } else {
      setUser(null);
      setLoggedInStatus(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const openToast = (res, successStatus, operationName) => {
    if (res.status === successStatus) {
      toast.success(`${operationName} succesfully!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } else {
      toast.error(`${operationName} failed!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const updateOffer = async (offerDetail) => {};

  const acceptOffer = async () => {
    try {
      const splitMainContract = await sdk.getContract(
        splitMainAddress,
        splitABI
      );
      const data = await splitMainContract.call("accept", [offerId]);
      const res = await OfferAPI.modifyOffer(
        offerId,
        OfferAPI.contractToMediStatus(2)
      );
      openToast(res, 200, "Accept offer");
      getOffer(); // refetch data
    } catch (error) {
      console.log("acceptOffer error", error);
    }
  };

  const declineOffer = async () => {
    try {
      const splitMainContract = await sdk.getContract(
        splitMainAddress,
        splitABI
      );
      const data = await splitMainContract.call("decline", [offerId]);
      const res = await OfferAPI.modifyOffer(
        offerId,
        OfferAPI.contractToMediStatus(3)
      );
      openToast(res, 200, "Decline offer");
      getOffer(); // refetch data
    } catch (error) {
      console.log("declineOffer error", error);
    }
  };

  const closeOffer = async () => {
    try {
      const splitMainContract = await sdk.getContract(
        splitMainAddress,
        splitABI
      );
      const data = await splitMainContract.call("close", [offerId]);
      const res = await OfferAPI.modifyOffer(
        offerId,
        OfferAPI.contractToMediStatus(1)
      );
      openToast(res, 200, "Close offer");
      getOffer(); // refetch data
    } catch (error) {
      console.log("closeOffer error", error);
    }
  };

  const onUpdateOffer = async (e) => {
    e.preventDefault();

    try {
      if (offer) {
        const res = await OfferAPI.modifyOffer(
          offerId,
          OfferAPI.contractToMediStatus(onChainOffer[2]),
          inputs.jobDescription
        );
        openToast(res, 200, "Modify offer");
      } else {
        const res = await OfferAPI.createOffer(
          offerId,
          onChainOffer[1],
          inputs.jobDescription
        );
        openToast(res, 200, "Create offer");
      }
      onCloseModal();
      getOffer();
    } catch (error) {
      console.log("onUpdateOffer ", error);
      toast.error("Update offer failed!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const showButton = (onClickFun, ifDisabled, text, btnColor) => {
    return (
      <button
        className={`px-3 py-2 rounded-lg ${
          ifDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } ml-3 ${btnColor}`}
        onClick={onClickFun}
        disabled={ifDisabled}
      >
        {text}
      </button>
    );
  };

  const copyText = (text) => {
    // console.log(text);
    navigator.clipboard.writeText(text);
    toast.success("Text is copied to your clipboard", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const copyAddress = (text) => {
    return (
      <span
        className="px-1 py-1 bg-gray-300 rounded-lg cursor-pointer ml-2 text-sm"
        onClick={() => copyText(text)}
      >
        Copy
      </span>
    );
  };

  const getAddress = (address) => {
    return (
      address.substring(0, 9) + "..." + address.substring(address.length - 4)
    );
  };

  const displayText = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
        <h5 className="font-medium text-2xl">Offer Details</h5>
        <div className="mx-auto mt-4">
          <ConnectWalletButton customClass="connectWalletButton" />
        </div>
        <hr className="h-1 bg-gray-500" />
        {loggedInStatus ? (
          onChainOffer &&
          address && (
            <div className="white-card-div mt-4 w-full md:w-3/4 mx-auto px-7">
              <div className="flex flex-col md:flex-row justify-between text-left gap-3">
                {onChainOffer[0] != address && (
                  <div className="text-left break-words mx-right">
                    <h3 className="text-xl font-medium">Offer Sender: </h3>
                    <h6>
                      <span className="font-medium">Address: </span>
                      {getAddress(onChainOffer[0])}{" "}
                      {copyAddress(onChainOffer[0])}
                    </h6>
                    <h6>
                      <span className="font-medium">Hospital Name: </span>{" "}
                      {offer?.hospitalName ? offer?.hospitalName : "N/A"}
                    </h6>
                  </div>
                )}
                {onChainOffer[1] != address && (
                  <div className="text-left break-words mx-right">
                    <h3 className="text-xl font-medium">Offer Receiver: </h3>
                    <h6 className="mt-2">
                      <span className="font-medium">Address: </span>
                      {getAddress(onChainOffer[1])}{" "}
                      {copyAddress(onChainOffer[1])}
                    </h6>
                    <h6 className="mt-2">
                      <span className="font-medium">Talent Name: </span>{" "}
                      {offer?.talentName ? offer?.talentName : "N/A"}
                    </h6>
                  </div>
                )}
                <div className="text-left break-words">
                  <h3 className="text-xl font-medium">Status: </h3>
                  <h6>{OfferAPI.statusToString(onChainOffer[2])}</h6>
                </div>
              </div>
              <div className="text-left break-words mx-right mt-7">
                <h3 className="text-xl font-medium">Details: </h3>
                <h6>
                  {offer?.offerDetail ? displayText(offer?.offerDetail) : "N/A"}
                </h6>
              </div>
              {onChainOffer[0] != address && (
                <div className="mt-8">
                  {showButton(
                    acceptOffer,
                    onChainOffer[2] != 0 ? true : false,
                    "Accept",
                    onChainOffer[2] != 0
                      ? "bg-blue-600 text-gray-300"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  )}
                  {showButton(
                    declineOffer,
                    onChainOffer[2] != 0 ? true : false,
                    "Decline",
                    onChainOffer[2] != 0
                      ? "bg-red-600 text-gray-300"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  )}
                  {/* <button
                className="bg-indigo-600"
                onClick={acceptOffer}
                disabled={onChainOffer[2] != 0}
              >
                Accept
              </button> */}
                  {/* <button
                className="bg-indigo-600"
                onClick={declineOffer}
                disabled={onChainOffer[2] != 0}
              >
                Decline
              </button> */}
                </div>
              )}

              {onChainOffer[1] != address && (
                <div className="mt-8">
                  {showButton(
                    onOpenModal,
                    onChainOffer[2] != 0 ? true : false,
                    "Update",
                    onChainOffer[2] != 0
                      ? "bg-blue-600 text-gray-300"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  )}
                  {showButton(
                    closeOffer,
                    onChainOffer[2] != 0 ? true : false,
                    "Close",
                    onChainOffer[2] != 0
                      ? "bg-yellow-600 text-gray-300"
                      : "bg-yellow-600 hover:bg-yellow-700 text-white"
                  )}
                </div>
              )}
            </div>
          )
        ) : (
          <div className="bg-red-300 w-full p-5 m-5 text-center text-xl">
            You are not authorized to view this page! Please login to continue!
          </div>
        )}

        <CustomModal
          open={open}
          onCloseModal={onCloseModal}
          title="Submit Job Details"
        >
          <form method="POST" onSubmit={onUpdateOffer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto text-left mt-8">
              <div className="col-span-1 md:col-span-2">
                <label>Job Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter Job Description"
                  name="jobDescription"
                  value={inputs.jobDescription || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mr-auto text-right">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ml-auto"
              >
                Submit Details
              </button>
            </div>
          </form>
        </CustomModal>
        <ToastContainer />
      </div>
    </>
  );
}
