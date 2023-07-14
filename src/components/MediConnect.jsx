// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../apiCall/Login";
import { useAddress } from "@thirdweb-dev/react";

const MediConnect = (props) => {
  const sdk = useSDK(); // Get SDK
  const [signature, setSignature] = useState(null);
  const [waitingMsg, setWaitingMsg] = useState(false);
  const address = useAddress();

  // Handle Medi API call
  const handleMediConnect = async () => {
    try {
      let initiateLogin = await Login.initiateLogin(address);
      // console.log(initiateLogin);
      if (initiateLogin?.status === 200 || initiateLogin?.status === 201) {
        let msgToSign = initiateLogin?.data?.messageToSign;
        if (msgToSign && msgToSign != "") {
          // Todo: sign the message and call verify sign API
        }
      } else {
        // Show error message
        toast.error(initiateLogin?.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Could not complete the sign in process! please try again!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleMediConnectOld = async () => {
    const message = "Please confirm to connect to Medi API Services"; // Message to show at the time of signing

    try {
      const signature = await sdk.wallet.sign(message); // Signing message using wallet
      setWaitingMsg(true);
      console.log(signature);
      if (signature && signature != undefined) {
        setSignature(signature);

        // Simulate API call by waiting few seconds
        // TODO: Integrate Medi API with the signature
        setTimeout(() => {
          setWaitingMsg(false);
          toast.success("You have connected to Medi succesfully!", {
            position: "bottom-right",
            autoClose: 3000,
          });
        }, 3000);
      } else {
        toast.error("Could not sign! Please try again!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Could not sign! Please try again!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      {signature && signature != null ? (
        // If signature present, show Refer Curriculum button
        <button
          href="#"
          disabled={waitingMsg}
          className={
            (waitingMsg
              ? "bg-indigo-300"
              : "bg-indigo-600 hover:bg-indigo-500") +
            " rounded-md font-thin px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          }
        >
          {waitingMsg ? (
            "Connecting to Medi..."
          ) : (
            <>
              Refer Curriculum <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      ) : (
        <button
          onClick={handleMediConnect}
          href="#"
          className={
            "bg-indigo-600 font-thin hover:bg-indigo-500 rounded-3xl px-3.5 py-2.5 text-sm text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          }
        >
          Connect Medi Account
        </button>
      )}
      {/* For toast message */}
      <ToastContainer className="z-60" />
    </div>
  );
};

export default MediConnect;
