import React, { useState, useEffect } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";
import { useSDK } from "@thirdweb-dev/react";
import {
  useAddress,
} from "@thirdweb-dev/react";
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
  splitABI
} from "../../const/yourDetails";


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

  const [inputs, setInputs] = useState({}); // For form

  async function getOffer() {
    if (offerId) {
      const splitMainContract = await sdk.getContract(splitMainAddress, splitABI);
      const offerOnChain = await splitMainContract.call(
        "getOffer",
        [
          offerId
        ]
      );
      console.log('offer on blockchain', offerOnChain);
      setOnChainOffer(offerOnChain);
      const res = await OfferAPI.getOffer(offerId);
      if (res.status === 200) {
        setOffer(res.data);
        console.log(res.data);
      } // otherwise Medi API returns { status: 404, data: [], message: "not_offer_error" }
    };
  }
  useEffect(() => {
    getOffer();
  }, [offerId]);

  const getUser = async () => {
    const res = await Login.getUser();
    if (res.status === 200) {
      setUser(res.data)
      console.log(res.data)
    }
  }
  useEffect(() => {
    getUser();
  },[]);


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
  }

  const updateOffer = async (offerDetail) => {

  }

  const acceptOffer = async () => {
    try {
      const splitMainContract = await sdk.getContract(splitMainAddress, splitABI);
      const data = await splitMainContract.call(
        "accept",
        [
          offerId,
        ]
      );
      const res = await OfferAPI.modifyOffer(offerId, OfferAPI.contractToMediStatus(2));
      openToast(res, 200, 'Accept offer')
      getOffer(); // refetch data
    } catch (error) {
      console.log('acceptOffer error', error)
    }
  };

  const declineOffer = async () => {
    try {
      const splitMainContract = await sdk.getContract(splitMainAddress, splitABI);
      const data = await splitMainContract.call(
        "decline",
        [
          offerId,
        ]
      );
      const res = await OfferAPI.modifyOffer(offerId, OfferAPI.contractToMediStatus(3));
      openToast(res, 200, 'Decline offer')
      getOffer(); // refetch data
    } catch (error) {
      console.log('declineOffer error', error)
    }
  };

  const closeOffer = async () => {
    try {
      const splitMainContract = await sdk.getContract(splitMainAddress, splitABI);
      const data = await splitMainContract.call(
        "close",
        [
          offerId,
        ]
      );
      const res = await OfferAPI.modifyOffer(offerId, OfferAPI.contractToMediStatus(1));
      openToast(res, 200, 'Close offer')
      getOffer(); // refetch data
    } catch (error) {
      console.log('closeOffer error', error)
    }
  };

  const onUpdateOffer = async (e) => {
    e.preventDefault();

    try {
      const res = await OfferAPI.modifyOffer(offerId, OfferAPI.contractToMediStatus(onChainOffer[2]), inputs.jobDescription);
      openToast(res, 200, 'Modify offer');
      onCloseModal();
      getOffer();
    } catch (error) {
      console.log('onUpdateOffer ', error);
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

  return (
    <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
      <h5 className="font-medium text-2xl">My Offers</h5>
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />

      {
        onChainOffer && address ? (
          <div>
          { onChainOffer[0] != address && <p>From: {onChainOffer[0]}, { offer && offer.hospitalName } </p> }
          { onChainOffer[1] != address && <p>To: {onChainOffer[1]}, { offer && offer.talentName }</p> }
          <p>Status: {  OfferAPI.statusToString(onChainOffer[2]) }</p>
          <p>Detail:</p>
          <p>{ offer && offer.offerDetail  }</p>

          { onChainOffer[0] != address && (
            <div>
              <button className="bg-indigo-600" onClick={acceptOffer}>Accept</button>
              <button className="bg-indigo-600" onClick={declineOffer}>Decline</button>
            </div>
          ) }

          { onChainOffer[1] != address && (
            <div>
              <button className="bg-indigo-600" onClick={onOpenModal}>Update</button>
              <button className="bg-indigo-600" onClick={closeOffer}>Close</button>
            </div>
          ) }

          </div>
        ) : (
          <p>Offer doesn't exist</p>
        )
      }

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
                value={inputs.jobDescription || offer && offer.offerDetail}
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
  );
}
