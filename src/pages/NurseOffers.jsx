import React, { useState } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";

export default function NurseOffers() {
  return (
    <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
      <h5 className="font-medium text-2xl">My Offers</h5>
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto mt-8">
        {jsonData.offers.map((offer, i) => {
          return <Offer offer={offer} key={i} />;
        })}
      </div>
    </div>
  );
}
