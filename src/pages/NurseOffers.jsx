import React, { useState, useEffect } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";
import { useSDK } from "@thirdweb-dev/react";
import {
  useAddress,
} from "@thirdweb-dev/react";

import {
  splitMainAddress,
  splitDestinations,
  splitPercentages,
  stablecoinAddress,
  platformAddress,
  nurseAddress,
  splitABI
} from "../../const/yourDetails";


export default function NurseOffers() {
  const sdk = useSDK(); // Get SDK
  const address = useAddress();

  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function getOffers() {
      if (address) {
        const splitMainContract = await sdk.getContract(splitMainAddress, splitABI);
        const offers = await splitMainContract.call(
          "getOffersReceivedByAddress",
          [
            address
          ]
        );
        setOffers(offers);
      };

    }
    getOffers();
  }, [address]);

  const onAccept = async (offerIndex) => {
    const splitMainContract = await sdk.getContract(splitMainAddress, splitABI);
    const PERCENTAGE_SCALE = 1000000;
    const percentAllocations = [
      PERCENTAGE_SCALE * splitPercentages[0],
      PERCENTAGE_SCALE * splitPercentages[1],
      PERCENTAGE_SCALE * splitPercentages[2]
    ];
    const data = await splitMainContract.call(
      "distributeERC20",
      [
        offerIndex,
        splitDestinations,
        percentAllocations
      ]
    );
  };

  const onDecline = async (offerIndex) => {
    const splitMainContract = await sdk.getContract(splitMainAddress, splitMainABI);
    const PERCENTAGE_SCALE = 1000000;
    const percentAllocations = [
      PERCENTAGE_SCALE * splitPercentages[0],
      PERCENTAGE_SCALE * splitPercentages[1],
      PERCENTAGE_SCALE * splitPercentages[2]
    ];
    const data = await splitMainContract.call(
      "returnDeposit",
      [
        offerIndex,
        splitDestinations,
        percentAllocations,
      ]
    );
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
      <h5 className="font-medium text-2xl">My Offers</h5>
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto mt-8">
        {offers.map((offer, i) => {
          return <Offer offer={{
            "id": i,
            "company": "XYZ Corporation Inc",
            "salary": "$10000",
            "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur fermentum sapien, a luctus tellus facilisis a. Integer felis erat, vestibulum ut sollicitudin nec, bibendum at ipsum.",
            "offerIndex": offer
          }} key={i} onAccept={onAccept} onDecline={onDecline} />;
        })}
      </div>
    </div>
  );
}
