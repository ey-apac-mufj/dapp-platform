import React, { useState, useEffect } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";
import { useSDK } from "@thirdweb-dev/react";
import {
  useAddress,
} from "@thirdweb-dev/react";
import { Link } from 'react-router-dom';


import {
  splitMainAddress,
  splitDestinations,
  splitPercentages,
  stablecoinAddress,
  platformAddress,
  splitABI
} from "../../const/yourDetails";


export default function NurseOffers() {
  const sdk = useSDK(); // Get SDK
  const address = useAddress();

  const [offers, setOffers] = useState([]);

  async function getOffers() {
    if (address) {
      const splitMainContract = await sdk.getContract(splitMainAddress, splitABI);
      const _offers = await splitMainContract.call(
        "getOffers",
        [
          address
        ]
      );
      setOffers(_offers);
      console.log(offers);
    };
  }

  useEffect(() => {
    getOffers();
  }, [address]);


  function OfferItem(props) {
    const id = props.id;
    return <li><Link to={`/offers/${id}`}>OfferID: {id}</Link>
        <p>From: {offers[1][props.index]}</p>
        <p>To: {offers[2][props.index]}</p>
        <p>Status: {offers[3][props.index]}</p>
      </li>
  }

  function OfferList(props) {
    const listItems = props.offers[0].map((offer, index) =>
      <OfferItem key={offer._hex} id={offer._hex} index={index} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    )
  }

  return (
    <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
      <h5 className="font-medium text-2xl">My Offers</h5>
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      {
        offers.length > 0 && offers[0].length > 0 &&
          (<OfferList offers={offers} />)
      }
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto mt-8">
        {offers.map((offer, i) => {
          return <Offer offer={{
            "id": i,
            "company": "XYZ Corporation Inc",
            "salary": "$10000",
            "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur fermentum sapien, a luctus tellus facilisis a. Integer felis erat, vestibulum ut sollicitudin nec, bibendum at ipsum.",
            "offerIndex": offer
          }} key={i} onAccept={onAccept} onDecline={onDecline} />;
        })}
      </div> */}
    </div>
  );
}
