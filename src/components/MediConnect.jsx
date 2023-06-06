// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MediConnect = (props) => {
  const sdk = useSDK(); // Get SDK
  const [signature, setSignature] = useState(null);
  const [waitingMsg, setWaitingMsg] = useState(false);

  const handleMediConnect = async () => {
    const message = "Please confirm to connect to Medi API Services"; // Signing message

    // sign the message with the connected wallet

    try {
      const signature = await sdk.wallet.sign(message);
      setWaitingMsg(true);
      console.log(signature);
      if (signature && signature != undefined) {
        setSignature(signature);

        // TODO: Call Medi API with the signature
        setTimeout(() => {
          setWaitingMsg(false);
          toast.success("You have connected to Medi succesfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        }, 3000);
      } else {
        toast.error("Could not sign! Please try again!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      //   console.log("yeeee");
      toast.error("Could not sign! Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      {/* <Toaster /> */}
      {signature && signature != null ? (
        <button
          href="#"
          disabled={waitingMsg}
          className={
            (waitingMsg
              ? "bg-indigo-300"
              : "bg-indigo-600 hover:bg-indigo-500") +
            " rounded-md font-thin px-3.5 py-2.5 text-sm text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          }
        >
          {waitingMsg ? (
            "Connecting to Medi..."
          ) : (
            <>
              Explore Community <span aria-hidden="true">→</span>
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

      <ToastContainer />
    </div>
  );
};

export default MediConnect;
