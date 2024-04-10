import React, { useEffect, useState } from "react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import {
  vcStoreAddress,
  messageToSign,
  vcContractABI,
} from "../../const/yourDetails";
import CryptoJS from "crypto-js";
import insta from "../images/insta.png";
import twitter from "../images/twitter.png";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";
import SwitchLanguage from "../components/SwitchLanguage";
import CustomModal from "../components/CustomModal";

import { Resolver } from "did-resolver";
import { getResolver } from "web-did-resolver";
import { verifyCredential } from "did-jwt-vc";

export default function CommunityHome() {
  const { t } = useTranslation();
  const sdk = useSDK();
  const address = useAddress();
  const [lastClick, setLastClick] = useState(Date.now());
  const [signature, setSignature] = useState("");
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentVC, setCurrentVC] = useState({});
  const [contractLoader, setContractLoader] = useState(false);
  const [enctyptedList, setEncryptedList] = useState([]);

  const webResolver = getResolver();
  const resolver = new Resolver({
    ...webResolver,
  });

  useEffect(() => {
    const onClick = () => {
      setLastClick(Date.now());
    };

    document.addEventListener("click", onClick);

    return () => {
      // cleanup - remove the listener when the component unmounts
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    window.showMUFG();
  }, [lastClick]);

  useEffect(() => {
    if (signature) {
      initiateContractCall();
    }
  }, [signature]);

  const initiateContractCall = async () => {
    try {
      setContractLoader(true);
      const contract = await sdk.getContract(vcStoreAddress, vcContractABI);
      const data = await contract.call("getCredentials", [address, 1]);
      setEncryptedList(data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load VCs", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setContractLoader(false);
    }
  };

  const signMessage = async () => {
    try {
      if (address) {
        setLoader(true);
        const id = toast("Logging you in, please wait...", {
          type: "info",
          autoClose: false,
        });
        const _signature = await sdk.wallet.sign(messageToSign);
        console.log(_signature);
        setSignature(_signature);
        toast.update(id, {
          render: "Logged In Successfully",
          type: "success",
          autoClose: 3000,
        });
      } else {
        toast.error("Please connect your wallet first!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Unable to login to EDI Platform! Please try again after sometime!",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setLoader(false);
    }
  };

  const decryptVC = (cipherText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, signature);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      setCurrentVC(JSON.parse(originalText));
      setOpen(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to decrypt your VC!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const verifyVC = async () => {
    try {
      setLoader(true);
      const verifiedVC = await verifyCredential(currentVC.proof.jwt, resolver);
      if (verifiedVC.verified) {
        toast.success("VC is verified successfully", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error("Unable to Verify VC", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error.message);
      setOpen(false);
      setCurrentVC({});
      toast({
        render: "Unable to verify VC",
        type: "error",
        autoClose: 3000,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center landing-page">
      {/* <img src={logo} alt="" className="mx-auto w-30" /> */}
      <h3 className="mt-5 text-3xl font-semi-bold text-black antonFont">
        {t("EDI Platform")}
      </h3>
      {/* <button onClick={() => changeLanguage()}>Toggle Language</button> */}
      <div className="stat-section w-100 mx-4 md:mx-20 mt-14 mb-7 px-3 md:px-8 p-4 rounded-2xl text-white shadow-xl">
        <div>
          {/* Show connect wallet button */}
          <ConnectWalletButton />
        </div>
      </div>

      {/* featured Communities */}
      <hr className="h-1 bg-gray-500" />
      {address && (
        <div className="m-4">
          {signature ? (
            contractLoader ? (
              "Loading VC lists"
            ) : enctyptedList.length ? (
              <div>
                {enctyptedList.map((data, index) => {
                  return (
                    <div className="flex flex-row pb-6 gap-x-5" key={index}>
                      <div>{index + 1}. &nbsp;&nbsp;&nbsp;&nbsp;</div>
                      <div className="truncate">{data.encryptedCredential}</div>
                      <div className="m-0">
                        <button
                          className="pink-button px-2 py-2"
                          onClick={() => {
                            decryptVC(data.encryptedCredential);
                          }}
                        >
                          DECRYPT
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              "No VC present"
            )
          ) : loader ? (
            "Loading...."
          ) : (
            <button className="pink-button" onClick={signMessage}>
              Login to EDI Platform
            </button>
          )}
        </div>
      )}
      <CustomModal
        title={"Decrypted VC"}
        open={open}
        onCloseModal={() => {
          setOpen(false);
          setCurrentVC({});
        }}
      >
        <div
          style={{
            overflow: "auto",
            textAlign: "left",
          }}
        >
          <pre>{JSON.stringify(currentVC, null, 4)}</pre>
        </div>
        <div className="m-0 pt-7">
          <button className="pink-button" onClick={verifyVC}>
            {loader ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                ></path>
              </svg>
            ) : null}
            {loader ? "VERIFYING" : "VERIFY"}
          </button>
        </div>
      </CustomModal>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-2 my-3 max-w-full">
        <div className="left-section mr-auto text-left flex gap-4">
          <h5>{t("Privacy Policy")}</h5>
          <h5>{t("Terms of Use")}</h5>
          <h5>{t("Help")}</h5>
        </div>
        <div className="right-section ml-auto flex gap-4">
          <img src={insta} alt="" className="h-8" />
          <img src={twitter} alt="" className="h-8" />
        </div>
      </div>
      <ToastContainer />
      <SwitchLanguage />
    </div>
  );
}
