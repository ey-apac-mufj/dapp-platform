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

      console.log(verifiedVC.verified);
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
      toast.error("Unable to Verify VC", {
        position: "top-right",
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
          }}
        >
          <code>{JSON.stringify(currentVC)}</code>
        </div>
        <div className="m-0 pt-7">
          <button className="pink-button px-2 py-2" onClick={verifyVC}>
            VERIFY
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
