import React, { useState, useEffect, useRef } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import CustomModal from "../components/CustomModal";
import StudentThumbnail from "../components/StudentThumbnail";
import StudentData from "../data.json";
import Student1 from "../images/student1.png";
import Student2 from "../images/student2.png";
import Student3 from "../images/student3.png";
import Student4 from "../images/student4.png";
import { useSDK } from "@thirdweb-dev/react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiurl } from "../../const/yourDetails";
import OfferAPI from "../apiCall/OfferAPI";
import { useAddress } from "@thirdweb-dev/react";
import { useContractEvents, useContract } from "@thirdweb-dev/react";
import { useParams } from "react-router-dom";

import {
  stablecoinAddress,
  splitMainAddress,
  splitDestinations,
  splitPercentages,
  platformAddress,
  depositAmount,
  splitABI,
  stablecoinABI,
} from "../../const/yourDetails";

export default function TalentDetail() {
  let { talentAddress } = useParams();
  const sdk = useSDK(); // Get SDK
  const address = useAddress();
  const [signature, setSignature] = useState(null);
  const [open, setOpen] = useState(false); // For modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const imgArr = [Student1, Student2, Student3, Student4];
  const [talent, setTalent] = useState(null);
  const [studentWalletAddress, setStudentWalletAddress] = useState("");

  const [inputs, _setInputs] = useState({}); // For form
  const [offerOutput, setOfferOutput] = useState(null);
  const [offers, setOffers] = useState([]);
  const [offerIndices, setOfferIndices] = useState([]);

  const inputsRef = useRef(inputs);
  const setInputs = (data) => {
    inputsRef.current = data;
    _setInputs(data);
  };

  async function getOffers() {
    if (address && talentAddress) {
      const splitMainContract = await sdk.getContract(
        splitMainAddress,
        splitABI
      );
      const _offers = await splitMainContract.call("getOffers", [address]);
      setOffers(_offers);
      let _offerIndices = [];
      _offers[0].forEach(function (_, i) {
        if (_offers[2][i] == talentAddress) {
          _offerIndices.push(i);
        }
      });
      setOfferIndices(_offerIndices);
      console.log(_offers[0][1]);
    }
  }

  useEffect(() => {
    getOffers();
  }, [address, talentAddress]);

  const callOfferAPI = async () => {
    setOfferOutput(null);
    try {
      let offerCreate = await OfferAPI.createOffer(
        offerOutput.offerIndex,
        offerOutput.trigger,
        offerOutput.jobDescription
      );
      console.log(offerCreate);
      toast.success("Your transaction is Successful!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.log("CreateOffer error ", error);
      toast.error("Problem occurs!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const subscribe = async (address) => {
    const splitMainContract = await sdk.getContract(splitMainAddress, splitABI);

    const unsubscribe = splitMainContract.events.addEventListener(
      "CreateOffer",
      async (event) => {
        console.log("CreateOffer event", event);
        const offerIndex = event.data._offerIndex._hex;
        const creator = event.data._creator;
        const trigger = event.data._trigger;
        console.log("Creator address", creator);
        console.log("Address address", address);
        if (creator == address) {
          if (!offerOutput) {
            setOfferOutput({
              offerIndex: offerIndex,
              trigger: trigger,
              jobDescription: inputsRef.current.jobDescription,
            });
          }
          // callOfferAPI(offerIndex, trigger, inputsRef.current.jobDescription);
        }
        onCloseModal();
      }
    );
  };

  useEffect(() => {
    if (offerOutput) {
      callOfferAPI();
    }
  }, [offerOutput]);

  useEffect(() => {
    if (address) {
      console.log("hi", address);
      subscribe(address);
    }
  }, [address]);

  useEffect(() => {
    const fetchData = async () => {
      if (talentAddress) {
        try {
          let getData = await fetch(
            `${apiurl}/api/get_talent/${talentAddress}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "GET",
              credentials: "include",
            }
          );
          let getDataRes = await getData.json();
          console.log("--------------------------------------");
          console.log("getDataRes ", getDataRes);
          if (getDataRes.status === 200) {
            setTalent(getDataRes.data);
          }
        } catch (error) {
          console.log("get_talent error ", error);
        }
      }
    };
    fetchData();
  }, [talentAddress]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ [name]: value });
  };

  const onHireSubmit = async (e) => {
    e.preventDefault();
    setDisableButton(true);
    setOfferOutput(null);

    try {
      const stablecoinContract = await sdk.getContract(
        stablecoinAddress,
        stablecoinABI
      );

      const rc = await stablecoinContract.call("approve", [
        splitMainAddress,
        depositAmount,
      ]);

      if (rc && rc != undefined) {
        const splitMainContract = await sdk.getContract(
          splitMainAddress,
          splitABI
        );
        const PERCENTAGE_SCALE = 1000000;
        const percentAllocations = [
          PERCENTAGE_SCALE * splitPercentages[0],
          PERCENTAGE_SCALE * splitPercentages[1],
          PERCENTAGE_SCALE * splitPercentages[2],
        ];
        const data = await splitMainContract.call("createOfferAndDeposit", [
          splitDestinations,
          percentAllocations,
          studentWalletAddress,
          depositAmount,
        ]);
      }
    } catch (error) {
      console.log("onHireSubmit ", error);
      onCloseModal();
      toast.error("Your transaction failed!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setInputs({});
      setDisableButton(false);
    }
  };

  const onHire = (studentWalletAddress) => {
    setStudentWalletAddress(studentWalletAddress);
    // console.log("on hire");
    onOpenModal();
  };

  const copyText = (text) => {
    // console.log(text);
    navigator.clipboard.writeText(text);
    toast.success("Text is copied to your clipboard", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center">
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      {address && talent && (
        <div>
          <h5 className="text-center text-3xl font-thin antonFont">
            {talent.userName}
          </h5>
          <img
            src={talent.picture || Student1}
            alt=""
            className="mx-auto h-40"
          />
          <div className="text-center px-4 py-4">
            <h5 className="my-1">Age: {talent.age}</h5>
            <h5 className="my-1">Gender: {talent.gender}</h5>
            <h5 className="my-1">Prefectures: {talent.prefectures}</h5>
            <h5 className="my-1">Address: {talent.address}</h5>
            <h5 className="my-1">Degree: {talent.degree}</h5>
            <h5 className="my-1">Working History: {talent.workHistory}</h5>
            <h5 className="my-1">Certificates: {talent.certificates}</h5>
            <h5 className="my-1">Phone Number: {talent.phoneNumber}</h5>
            <h5 className="my-2">
              {" "}
              {talent.walletAddress.substring(0, 8) +
                "..." +
                talent.walletAddress.substring(
                  talent.walletAddress.length - 4
                )}{" "}
              <span
                className="px-1 py-1 bg-gray-200 rounded-lg"
                onClick={() => copyText(talent.walletAddress)}
              >
                Copy
              </span>
            </h5>
            <div className="mx-auto text-center">
              <button
                onClick={() => onHire(talent.walletAddress)}
                className="font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 mx-auto"
              >
                Create a New Offer
              </button>
            </div>
            {offerIndices.length > 0 && (
              <div>
                <div className="mx-auto text-center">
                  Historical Offers From Me:
                </div>
                <div>
                  {offerIndices.map((offerIndex, i) => {
                    return (
                      <Link
                        key={i}
                        to={`/offers/${offers[0][offerIndex]._hex}`}
                      >
                        {offers[0][offerIndex]._hex},
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <CustomModal
        open={open}
        onCloseModal={onCloseModal}
        title="Submit Job Details"
      >
        <form method="POST" onSubmit={onHireSubmit}>
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
          <div className="mr-auto flex text-right">
            <p className="mt-4 italic">
              {disableButton ? "Please wait... Transaction in progress..." : ""}
            </p>
            <button
              type="submit"
              disabled={disableButton}
              className={`${
                disableButton
                  ? "cursor-not-allowed bg-indigo-700 text-gray-300"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }  rounded-lg px-3.5 py-2.5 text-sm  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ml-auto`}
            >
              {disableButton ? "Processing..." : "Submit Details"}
            </button>
          </div>
        </form>
      </CustomModal>
      <ToastContainer />
    </div>
  );
}
