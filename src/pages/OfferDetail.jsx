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
      await OfferAPI.modifyOffer(offerId, OfferAPI.contractToMediStatus(2));
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
      await OfferAPI.modifyOffer(offerId, OfferAPI.contractToMediStatus(3));
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
      await OfferAPI.modifyOffer(offerId, OfferAPI.contractToMediStatus(1));
      getOffer(); // refetch data
    } catch (error) {
      console.log('closeOffer error', error)
    }
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
              <button className="bg-indigo-600">Update</button>
              <button className="bg-indigo-600" onClick={closeOffer}>Close</button>
            </div>
          ) }

          </div>
        ) : (
          <p>Offer doesn't exist</p>
        )
      }

    </div>
  );
}
