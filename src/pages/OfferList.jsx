import React, { useState, useEffect } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";
import { useSDK } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import OfferAPI from "../apiCall/OfferAPI";
import { ToastContainer, toast } from "react-toastify";

import {
  splitMainAddress,
  splitDestinations,
  splitPercentages,
  stablecoinAddress,
  platformAddress,
  splitABI,
} from "../../const/yourDetails";
import Navbar from "../components/Navbar";

export default function OfferList() {
  const statusList = {
    0: {
      title: "Open",
      class: "text-blue-500",
    },
    1: {
      title: "Closed",
      class: "text-yellow-500",
    },
    2: {
      title: "Accepted",
      class: "text-green-500",
    },
    3: {
      title: "Declined",
      class: "text-red-500",
    },
  };
  const sdk = useSDK(); // Get SDK
  const address = useAddress();

  const [offers, setOffers] = useState([]);
  const [mediOffers, setMediOffers] = useState({});

  async function getOffers() {
    if (address) {
      const splitMainContract = await sdk.getContract(
        splitMainAddress,
        splitABI
      );
      const _offers = await splitMainContract.call("getOffers", [address]);
      setOffers(_offers);
      console.log(_offers);
    }
  }

  useEffect(() => {
    getOffers();
  }, [address]);

  async function getMediOffers() {
    if (offers.length > 0) {
      for (const offerID of offers[0]) {
        const res = await OfferAPI.getOffer(offerID._hex);
        if (res.status === 200) {
          console.log("res", res);
          setMediOffers((values) => ({ ...values, [offerID._hex]: res.data }));
        }
      }
    }
  }

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

  useEffect(() => {
    getMediOffers();
  }, [offers]);

  function OfferItem(props) {
    const id = props.id;
    // console.log("this is index", props.index);
    return (
      <tr className={`${props.index % 2 !== 0 ? "bg-gray-200" : ""}`}>
        <td className="py-3">{id}</td>
        {/* <td>
          {" "}
          {offers[1][props.index] != address && (
            <p>
              From: {offers[1][props.index]}{" "}
              {mediOffers[id] && mediOffers[id].hospitalName}{" "}
            </p>
          )}
        </td> */}
        <td>
          {offers[1][props.index] != address && (
            <>
              <span>From: {getAddress(offers[1][props.index])}</span>
              {copyAddress(offers[1][props.index])}
            </>
          )}
          {offers[2][props.index] != address && (
            <>
              <span>To: {getAddress(offers[2][props.index])}</span>
              {copyAddress(offers[2][props.index])}
            </>
          )}
        </td>
        <td>
          {offers[1][props.index] != address && (
            <span>
              {mediOffers[id] && mediOffers[id].hospitalName
                ? mediOffers[id] && mediOffers[id].hospitalName
                : "N/A"}
            </span>
          )}
          {offers[2][props.index] != address && (
            <span>
              {mediOffers[id] && mediOffers[id].talentName
                ? mediOffers[id] && mediOffers[id].talentName
                : "N/A"}
            </span>
          )}

          {/* {mediOffers[id] && mediOffers[id].talentName} */}
        </td>
        <td>
          <span className={statusList[offers[3][props.index]]?.class}>
            {statusList[offers[3][props.index]]?.title}
          </span>
        </td>
        <td>
          <button
            className="text-sm bg-purple-500 px-2 py-1 rounded-md text-white hover:bg-purple-600"
            title="Offer Details"
          >
            <Link className="text-white" to={`/offers/${id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </button>
        </td>
      </tr>
    );
  }

  function OfferList(props) {
    const listItems = props.offers[0].map((offer, index) => (
      <OfferItem key={offer._hex} id={offer._hex} index={index} />
    ));
    return (
      <div className="white-card-div mt-3">
        <table className="table-auto w-full rounded-md border-gray-600 mt-1">
          <thead className="border-b border-gray-600">
            <tr className="bg-gray-700 text-white">
              <th className="py-4">Offer ID</th>
              <th>Address</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
        <h5 className="font-medium text-2xl">My Offers</h5>
        <div className="mx-auto mt-4">
          <ConnectWalletButton customClass="connectWalletButton" />
        </div>
        <hr className="h-1 bg-gray-500" />
        {offers.length > 0 && offers[0].length > 0 && (
          <OfferList offers={offers} />
        )}
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
        <ToastContainer />
      </div>
    </>
  );
}
