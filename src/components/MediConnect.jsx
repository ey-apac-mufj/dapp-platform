// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState, useEffect, useContext } from "react";
import { useSDK } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../apiCall/Login";
import { useAddress } from "@thirdweb-dev/react";
import { apiurl } from "../../const/yourDetails";
import { LoginContext } from "../contexts/LoginContext";

const MediConnect = (props) => {
  const sdk = useSDK(); // Get SDK
  const [signature, setSignature] = useState(null);
  const [waitingMsg, setWaitingMsg] = useState(false);
  const { loggedInStatus, setLoggedInStatus } = useContext(LoginContext);
  const address = useAddress();

  const checkLogInStatus = async () => {
    try {
      let getUser = await fetch(`${apiurl}/api/get_user`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      });
      let getUserRes = await getUser.json();
      console.log("--------------------------------------");
      console.log("getUserRes ", getUserRes);
      if (getUserRes.status === 200) {
        setLoggedInStatus(true);
      } else {
        setLoggedInStatus(false);
      }
    } catch (error) {
      console.log("checkLogInStatus error ", error);
    }
  };
  useEffect(() => {
    checkLogInStatus();
  }, []);

  // Test code
  const [result1, setResult1] = useState("Waiting for result1");
  const [result2, setResult2] = useState("Waiting for result2");
  useEffect(() => {
    const fetchData = async (method, url, setResult) => {
      try {
        let getUser = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          method: method,
          credentials: "include",
        });
        let getUserRes = await getUser.json();
        console.log("--------------------------------------");
        console.log(getUserRes);
        setResult(getUserRes);
        return getUserRes;
      } catch (error) {
        setResult(error);
      }
    };

    fetchData(
      "GET",
      "https://medi-lx.xyz/api/get_talent/0xFDB406A3d386924CAe4bB808d75829baB96972dc",
      setResult1
    ).catch(console.error);

    fetchData("GET", "https://medi-lx.xyz/api/get_talents", setResult2).catch(
      console.error
    );
  }, [loggedInStatus]);

  const handleMediLogout = async () => {
    let logout = await fetch("https://medi-lx.xyz/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
    let logoutRes = await logout.json();
    setSignature(null);
    console.log("--------------------------------------");
    console.log(logoutRes);
    checkLogInStatus();
  };

  const handleMediConnect = async () => {
    const message =
      "Please confirm to connect to Medi API Services at " + Date.now(); // Message to show at the time of signing

    try {
      const signature = await sdk.wallet.sign(message); // Signing message using wallet
      setWaitingMsg(true);
      console.log(signature);
      if (signature && signature != undefined) {
        setSignature(signature);

        try {
          let login = await Login.login(address, message, signature);
          if (login?.status === 200 || login?.status === 201) {
            setWaitingMsg(false);
            setLoggedInStatus(true);
          } else if (login?.status === 404) {
            window.location.href = `https://medi-lx.xyz/site/register?address=${address}`;
          } else {
            // Show error message
            console.log(login);
            toast.error(login?.message, {
              position: "bottom-right",
              autoClose: 3000,
            });
          }
        } catch (error) {
          toast.error(
            "Could not complete the sign in process! please try again!",
            {
              position: "bottom-right",
              autoClose: 3000,
            }
          );
        }
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
      {loggedInStatus ? (
        // If signature present, show Refer Curriculum button
        <div>
          <button
            href="#"
            disabled={waitingMsg}
            className={
              (waitingMsg
                ? "bg-indigo-300"
                : "bg-indigo-600 hover:bg-indigo-500") +
              " rounded-full font-thin px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
          {/* <button
            onClick={handleMediLogout}
            href="#"
            className={
              "bg-indigo-600 font-thin hover:bg-indigo-500 rounded-3xl px-3.5 py-2.5 text-sm text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }
          >
            Logout
          </button> */}
        </div>
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
      {/* <div>
        <p>{JSON.stringify(result1, null, 2) }</p>
        <p>{JSON.stringify(result2, null, 2) }</p>
      </div> */}
      <ToastContainer className="z-60" />
    </div>
  );
};

export default MediConnect;
