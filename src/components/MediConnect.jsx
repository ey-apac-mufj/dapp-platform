// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MediConnect = (props) => {
  const sdk = useSDK(); // Get SDK
  const [signature, setSignature] = useState(null);
  const [waitingMsg, setWaitingMsg] = useState(false);

  // Handle Medi API call
  const handleMediConnect = async () => {
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