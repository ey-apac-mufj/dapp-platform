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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiurl } from "../../const/yourDetails";
import OfferAPI from "../apiCall/OfferAPI";
import { useAddress } from "@thirdweb-dev/react";
import { useContractEvents, useContract } from "@thirdweb-dev/react";

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

export default function StudentList() {
  const sdk = useSDK(); // Get SDK
  const address = useAddress();
  const [signature, setSignature] = useState(null);
  const [open, setOpen] = useState(false); // For modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const imgArr = [Student1, Student2, Student3, Student4];
  const [students, setStudents] = useState([]);
  const [studentWalletAddress, setStudentWalletAddress] = useState("");

  const [inputs, _setInputs] = useState({}); // For form
  const [offerOutput, setOfferOutput] = useState(null);

  const inputsRef = useRef(inputs);
  const setInputs = (data) => {
    inputsRef.current = data;
    _setInputs(data);
  };

  const callOfferAPI = async () => {
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
    setOfferOutput(null);
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
      try {
        let getData = await fetch(`${apiurl}/api/get_talents`, {
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
          setStudents(getDataRes.data);
        }
      } catch (error) {
        console.log("get_talents error ", error);
      }
    };
    fetchData();
  }, []);

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

  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center">
      <h5 className="text-center text-3xl font-thin antonFont">Talent List</h5>
      <input
        type="text"
        className="w-90 md:w-80 mt-5 ml-2 pl-5 pr-3 py-2 rounded-full text-center"
        placeholder="Search Talents"
      />
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      {
        address ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mt-8">
            {students.map((student, i) => {
              student.image = imgArr[i];
              return <StudentThumbnail student={student} onHire={onHire} key={i} />;
            })}
          </div>
        ) :
          (
            <div>Waiting for wallet connection</div>
          )
      }
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
