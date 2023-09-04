import React, { useState, useEffect, useRef, useContext } from "react";
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
import { apiurl, userTypes } from "../../const/yourDetails";
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
import Navbar from "../components/Navbar";
import { LoginContext } from "../contexts/LoginContext";
import SwitchLanguage from "../components/SwitchLanguage";
import { useTranslation } from "react-i18next";
import UtilityFunctions from "../utilities/UtilityFunctions";

export default function TalentDetail() {
  const { t } = useTranslation();
  let { talentAddress } = useParams();
  const sdk = useSDK(); // Get SDK
  const address = useAddress();
  const [signature, setSignature] = useState(null);
  const [open, setOpen] = useState(false); // For modal
  const onOpenModal = () => {
    setInputs({});
    setOfferOutput(null);
    setDisableButton(false);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const imgArr = [Student1, Student2, Student3, Student4];
  const [talent, setTalent] = useState(null);
  const [studentWalletAddress, setStudentWalletAddress] = useState("");

  const [inputs, _setInputs] = useState({}); // For form
  const [offerOutput, _setOfferOutput] = useState(null);
  const [offers, setOffers] = useState([]);
  const [offerIndices, setOfferIndices] = useState([]);
  const { loggedInStatus, userData } = useContext(LoginContext);

  const inputsRef = useRef(inputs);
  const setInputs = (data) => {
    inputsRef.current = data;
    _setInputs(data);
  };

  const offerOutputRef = useRef(offerOutput);
  const setOfferOutput = (data) => {
    offerOutputRef.current = data;
    _setOfferOutput(data);
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
    try {
      let offerCreate = await OfferAPI.createOffer(
        offerOutput.offerIndex,
        offerOutput.trigger,
        offerOutput.jobDescription
      );
      console.log(offerCreate);
      toast.success(t("Your transaction is Successful!"), {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.log("CreateOffer error ", error);
      toast.error(t("Error in creating offer"), {
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
          if (!offerOutputRef.current) {
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

  const fetchData = async () => {
    if (talentAddress) {
      try {
        let getData = await fetch(`${apiurl}/api/get_talent/${talentAddress}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
          credentials: "include",
        });
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

  useEffect(() => {
    fetchData();
  }, [talentAddress]);

  useEffect(() => {
    fetchData();
  }, [loggedInStatus]);

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
      toast.error(t("Your transaction failed!"), {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const onHire = (studentWalletAddress) => {
    setStudentWalletAddress(studentWalletAddress);
    // console.log("on hire");
    onOpenModal();
  };

  return (
    <>
      <Navbar />
      <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center">
        <h5 className="font-medium text-2xl text-center">
          {t("Talent Details")}
        </h5>
        <div className="mx-auto mt-4">
          <ConnectWalletButton customClass="connectWalletButton" />
        </div>
        <hr className="h-1 bg-gray-500" />
        {loggedInStatus && userData?.acount_type === userTypes.employer ? (
          address &&
          talent && (
            <>
              <div className="white-card-div w-full md:w-1/2 mx-auto px-0 pt-0 mb-10 pb-6 rounded-lg mt-6">
                <div className="relative h-40">
                  <div className="w-full h-full bg-blue-400 rounded-t-lg"></div>
                </div>
                <div className="relative shadow mx-auto h-40 w-40 -my-16 border-white rounded-full overflow-hidden border-4">
                  <img
                    className="object-cover w-full h-full"
                    src={talent.picture || Student1}
                  />
                </div>
                <div className="mt-12 pt-4 px-5">
                  <h5 className="text-center text-3xl font-thin antonFont mt-3">
                    {talent.userName}
                  </h5>
                  <h5 className="my-4">
                    {" "}
                    {talent.walletAddress.substring(0, 8) +
                      "..." +
                      talent.walletAddress.substring(
                        talent.walletAddress.length - 4
                      )}{" "}
                    <span
                      className="px-1 py-1 bg-gray-200 rounded-lg cursor-pointer"
                      onClick={() =>
                        UtilityFunctions.copyText(talent.walletAddress)
                      }
                    >
                      {t("Copy")}
                    </span>
                  </h5>
                  <table className="table-auto w-full rounded-md border-gray-600 mt-6">
                    <tbody>
                      <tr className="bg-gray-200">
                        <th className="py-2">{t("Age")} </th>
                        <td>{talent.age ? talent.age : t("Not available")} </td>
                      </tr>
                      <tr>
                        <th className="py-2">{t("Gender")}: </th>
                        <td>
                          {talent.gender ? talent.gender : t("Not available")}{" "}
                        </td>
                      </tr>
                      <tr className="bg-gray-200">
                        <th className="py-2">{t("Prefectures")}: </th>
                        <td>
                          {talent.prefectures
                            ? talent.prefectures
                            : t("Not available")}{" "}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2">{t("Address")}: </th>
                        <td>
                          {talent.address ? talent.address : t("Not available")}{" "}
                        </td>
                      </tr>
                      <tr className="bg-gray-200">
                        <th className="py-2">{t("Degree")}: </th>
                        <td>
                          {talent.degree ? talent.degree : t("Not available")}{" "}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2">{t("Working History")}: </th>
                        <td>
                          {talent.workHistory
                            ? talent.workHistory
                            : t("Not available")}{" "}
                        </td>
                      </tr>
                      <tr className="bg-gray-200">
                        <th className="py-2">{t("Certificates")}: </th>
                        <td>
                          {talent.certificates
                            ? talent.certificates
                            : t("Not available")}{" "}
                        </td>
                      </tr>
                      <tr>
                        <th className="py-2">{t("Phone Number")}: </th>
                        <td>
                          {talent.phoneNumber
                            ? talent.phoneNumber
                            : t("Not available")}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mx-auto text-center mt-5">
                    <button
                      onClick={() => onHire(talent.walletAddress)}
                      className="font-medium bg-indigo-600 hover:bg-indigo-500 rounded-full px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 mx-auto"
                    >
                      {t("Create New Offer")}
                    </button>
                  </div>
                  <div className="mt-4 whitespace-normal">
                    {offerIndices.length > 0 && (
                      <div>
                        <div className="mx-auto text-center text-lg font-medium mt-6 mb-4">
                          {t("Previous Offers From Me:")}
                        </div>
                        <div className="break-words grid grid-cols-4 md:grid-cols-8 mx-auto">
                          {offerIndices.map((offerIndex, i) => {
                            return (
                              <div
                                className="bg-gray-200 mx-1 my-1 px-1 py-1 cursor-pointer rounded-md hover:bg-gray-300"
                                key={i}
                              >
                                <Link
                                  className="text-gray-700"
                                  to={`/offers/${offers[0][offerIndex]._hex}`}
                                >
                                  {offers[0][offerIndex]._hex}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )
        ) : (
          <div className="bg-red-300 w-full p-5 m-5 text-center text-xl">
            {t(
              "You are not authorized to view this page! Please login to continue!"
            )}
          </div>
        )}

        <CustomModal
          open={open}
          onCloseModal={onCloseModal}
          title={t("Submit Job Details")}
        >
          <form method="POST" onSubmit={onHireSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto text-left mt-8">
              <div className="col-span-1 md:col-span-2">
                <label>{t("Job Description")}</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder={t("Enter Job Description")}
                  name="jobDescription"
                  value={inputs.jobDescription || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mr-auto flex text-right">
              <p className="mt-4 italic">
                {disableButton
                  ? t("Please wait... Transaction in progress...")
                  : ""}
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
                {disableButton ? t("Processing...") : t("Submit Details")}
              </button>
            </div>
          </form>
        </CustomModal>
        <ToastContainer />
        <SwitchLanguage />
      </div>
    </>
  );
}
