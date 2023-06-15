import React, { useState } from "react";
import Correct from "../images/correct.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConnectWalletButton from "../components/ConnectWalletButton";
import { useSDK } from "@thirdweb-dev/react";

export default function ContractDeposit() {
  const sdk = useSDK(); // Get SDK
  const [signature, setSignature] = useState(null);
  const copyText = (text) => {
    // console.log(text);
    navigator.clipboard.writeText(text);
    toast.success("Contract address is copied!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };
  const [contractVerified, setContractVerified] = useState(true);
  const [coinAmount, setCoinAmount] = useState(0);

  // Handling form input change
  const handleAmountChange = (event) => {
    setCoinAmount(event.target.value);
  };

  // Sunmit number of coins to submit
  const onCoinSubmit = async (event) => {
    event.preventDefault();
    if (coinAmount > 0) {
      const message = "Please confirm MTK coins deposit";
      try {
        const signature = await sdk.wallet.sign(message);
        // console.log(signature);
        if (signature && signature != undefined) {
          setSignature(signature);
          setCoinAmount(0);
          toast.success(
            "You have succesfully transferred " + coinAmount + " stablecoins!",
            {
              position: "bottom-right",
              autoClose: 3000,
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
      <div className="mx-auto white-card w-full md:w-[600px] hover:bg-white cursor-default">
        <img src={Correct} className="mx-auto mb-5 h-20" />
        <h5 className="text-center text-xl font-medium">
          Contract Deployed successfully
        </h5>
        <h5 className="text-center text-lg mt-5">
          <span className="font-medium">Contract Address: </span>
          0x12dsjd...
          <span
            className="px-1 py-1 bg-gray-200 rounded-lg cursor-pointer ml-5 text-sm"
            onClick={() => copyText("dummyContractAddress")}
          >
            Copy
          </span>
        </h5>
        <div className="mx-auto mt-4">
          <ConnectWalletButton customClass="connectWalletButton" />
        </div>
        <hr className="h-1 bg-gray-500 my-6" />
        {/* if the contract is whitelisted then show the deposit coin form */}
        {contractVerified && (
          <div className="text-left mt-8 px-10">
            <h5 className="text-center font-medium text-xl">
              Deposit Funds to Contract
            </h5>
            <form method="POST" onSubmit={onCoinSubmit}>
              <div className="mt-7">
                <label>Stablecoin Amount</label>
                <input
                  name="coinAmount"
                  value={coinAmount || ""}
                  onChange={handleAmountChange}
                  type="number"
                  placeholder="Enter No. of Stablecoins (MTK)"
                  className="form-control"
                  required
                />
              </div>
              <div className="mx-auto mt-5 text-right">
                <button
                  type="submit"
                  className="mx-auto bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4"
                >
                  Deposit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
