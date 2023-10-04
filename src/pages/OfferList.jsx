import React, { useState, useEffect, useContext } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";
import { useSDK } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { Link } from "react-router-dom";
import OfferAPI from "../apiCall/OfferAPI";
import User from "../apiCall/User";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../contexts/LoginContext";
import { userTypes } from "../../const/yourDetails";

import {
  splitMainAddress,
  splitDestinations,
  splitPercentages,
  stablecoinAddress,
  platformAddress,
  splitABI,
} from "../../const/yourDetails";
import Navbar from "../components/Navbar";
import SwitchLanguage from "../components/SwitchLanguage";
import { useTranslation } from "react-i18next";
import UtilityFunctions from "../utilities/UtilityFunctions";

export default function OfferList() {
  const { t } = useTranslation();
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
  const [nameDict, setNameDict] = useState({});
  const { loggedInStatus, userData } = useContext(LoginContext);

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

  async function getNames() {
    if (offers.length > 0) {
      var nameMap = {};
      for (var i = 0; i < offers[0].length; i++) {
        const fromAddress = offers[1][i];
        const toAddress = offers[2][i];
        if (fromAddress != address && !nameMap[fromAddress]) {
          const fromUserRes = await User.getUserInfo(fromAddress);
          if (fromUserRes.status === 200) {
            nameMap[fromAddress] = fromUserRes.data?.userName;
          }
        }
        if (toAddress != address && !nameMap[toAddress]) {
          const toUserRes = await User.getUserInfo(toAddress);
          if (toUserRes.status === 200) {
            nameMap[toAddress] = toUserRes.data?.userName;
          }
        }
      }
      setNameDict(nameMap);
    }
  }

  const copyAddress = (text) => {
    return (
      <span
        className="px-1 py-1 bg-gray-300 rounded-lg cursor-pointer ml-2 text-sm"
        onClick={() => UtilityFunctions.copyText(text)}
      >
        {t("Copy")}
      </span>
    );
  };

  const getAddress = (address) => {
    return (
      address.substring(0, 9) + "..." + address.substring(address.length - 4)
    );
  };

  useEffect(() => {
    getNames();
  }, [offers, loggedInStatus]);

  function OfferItem(props) {
    const id = props.id;
    // console.log("this is index", props.index);
    return (
      <tr className={`${props.index % 2 !== 0 ? "bg-gray-200" : ""}`}>
        <td className="py-3">{Number(id)}</td>
        <td>
          {offers[1][props.index] != address && (
            <span>
              {nameDict[offers[1][props.index]]
                ? nameDict[offers[1][props.index]]
                : "N/A"}
            </span>
          )}
          {offers[2][props.index] != address && (
            <span>
              {nameDict[offers[2][props.index]]
                ? nameDict[offers[2][props.index]]
                : "N/A"}
            </span>
          )}
        </td>
        <td>
          <span className={statusList[offers[3][props.index]]?.class}>
            {t(statusList[offers[3][props.index]]?.title)}
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
              <th className="py-4">{t("Offer ID")}</th>
              {userData?.acount_type === userTypes.employer && (
                <th>{t("Talent Name")}</th>
              )}
              {userData?.acount_type === userTypes.talent && (
                <th>{t("Hospital Name")}</th>
              )}
              <th>{t("Status")}</th>
              <th>{t("Action")}</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <Navbar activeMenu="Offers" />
      <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
        <h5 className="font-medium text-2xl">
          {userData?.acount_type === userTypes.employer
            ? t("Created Offers")
            : userData?.acount_type === userTypes.talent
            ? t("Received Offers")
            : ""}
        </h5>
        <div className="mx-auto mt-4">
          <ConnectWalletButton customClass="connectWalletButton" />
        </div>
        <hr className="h-1 bg-gray-500" />
        {loggedInStatus ? (
          offers.length > 0 &&
          offers[0].length > 0 && <OfferList offers={offers} />
        ) : (
          <div className="bg-red-300 w-full p-5 m-5 text-center text-xl">
            {t(
              "You are not authorized to view this page! Please login to continue!"
            )}
          </div>
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
      <SwitchLanguage />
    </>
  );
}
