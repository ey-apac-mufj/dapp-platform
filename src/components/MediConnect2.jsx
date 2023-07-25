// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState, useEffect } from "react";
import { useSDK } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MediConnect2 = (props) => {
  const sdk = useSDK(); // Get SDK
  const [signature, setSignature] = useState(null);
  const [waitingMsg, setWaitingMsg] = useState(false);
  const [result1, setResult1] = useState('Waiting for result1');
  const [result2, setResult2] = useState('Waiting for result2');

  useEffect(() => {
    const fetchData = async (method, url, setResult) => {
      try {
        let getUser = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          method: method,
          credentials: 'include',
        });
        let getUserRes = await getUser.json();
        console.log('--------------------------------------');
        console.log(getUserRes);
        setResult(getUserRes);
        return getUserRes;
      } catch (error) {
        console.log(error);
      }
    }

    fetchData('GET', 'https://medi-lx.xyz/api.php', setResult1)
    .catch(console.error);

    fetchData('GET', 'https://medi-lx.xyz/api/get_user', setResult2)
    .catch(console.error);

  },[]);

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
        <div>
          <form method='post' action='https://medi-lx.xyz/api/verify_user'>
            <input type='hidden' name='walletAddress' value='0x437C69D879D8f4AB609cABB52039a6df10789E6a'/>
            <input type='hidden' name='signature' value='0x0ed28e24e9f20ec650d3d18443e64717730c12a173d4ae267d04c238c93af6fc08bf1ee8817f149e8b128f9845957f180843929e337cacfd1e8f718b8f0006851b'/>
            <input type='hidden' name='message' value='Please confirm to connect to Medi API Services'/>
            <input type="submit" value="api/verify_user" />
          </form>
          <p>{JSON.stringify(result1, null, 2) }</p>
          <p>{JSON.stringify(result2, null, 2) }</p>
        </div>
      )}
      {/* For toast message */}
      <ToastContainer className="z-60" />
    </div>
  );
};

export default MediConnect2;
