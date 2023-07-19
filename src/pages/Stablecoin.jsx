import React, { useState, useEffect } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";
import { useSDK } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from 'ethers';
import {
  useAddress,
} from "@thirdweb-dev/react";

import {
  stablecoinAddress,
  stablecoinABI,
} from "../../const/yourDetails";


export default function Stablecoin() {
  const sdk = useSDK(); // Get SDK
  const address = useAddress();

  const [whitelistStatus, setWhitelistStatus] = useState(null);
  const [whitelistAddress, setWhitelistAddress] = useState('');
  const [mintInputs, setMintInputs] = useState({});
  const handleMintChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMintInputs((values) => ({ ...values, [name]: value }));
  };

  const handleWhitelistChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setWhitelistStatus(null);
    setWhitelistAddress(value);
  };

  const checkWhitelist = async (address) => {
    const stablecoinContract = await sdk.getContract(stablecoinAddress, stablecoinABI);
    const status = await stablecoinContract.call(
      "checkWhitelist",
      [
        address
      ]
    );
    return status;
  };

  async function updateStatus() {
    if (ethers.utils.isAddress(whitelistAddress)) {
      try {
        const status = await checkWhitelist(whitelistAddress);
        setWhitelistStatus(status);
      } catch (error) {
        console.log(error);
      }
    };
  }

  useEffect(() => {
    updateStatus();
  }, [whitelistAddress]);

  const onUpdateWhitelist = async (e) => {
    e.preventDefault();

    try {
      const stablecoinContract = await sdk.getContract(
        stablecoinAddress,
        stablecoinABI
      );
      if (ethers.utils.isAddress(whitelistAddress)) {
        const status = await checkWhitelist(whitelistAddress);
        const rc = await stablecoinContract.call("updateWhitelist", [
          whitelistAddress,
          !status,
        ]);
        if (rc && rc != undefined) {
          toast.success("Your transaction is Successful!", {
            position: "bottom-right",
            autoClose: 3000,
          });
          updateStatus();
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  const onMint = async (e) => {
    e.preventDefault();

    try {
      const stablecoinContract = await sdk.getContract(
        stablecoinAddress,
        stablecoinABI
      );
      const address = mintInputs.mintToAddress;
      const amount = ethers.utils.parseEther(mintInputs.amount);

      const rc = await stablecoinContract.call("mint", [
        address,
        amount,
      ]);

      if (rc && rc != undefined) {
        toast.success("Your transaction is Successful!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        setMintInputs({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
      <h5 className="font-medium text-2xl">Stablecoin Management</h5>
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="">
        <form method="POST" onSubmit={onUpdateWhitelist}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto text-left mt-8">
            <div>
              <label>Address</label>
              <input
                name="whitelistAddress"
                value={whitelistAddress || ""}
                onChange={handleWhitelistChange}
                placeholder="Enter the address to update its whitelist status"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div>
              <label>Status: {whitelistStatus == null ? 'Waiting...' : whitelistStatus? 'In whitelist': 'Not in whitelist'}
              </label>
            </div>
          </div>
          <div className="mr-auto text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ml-auto"
            >
              {whitelistStatus? 'Remove from whitelist': 'Add to whitelist'}
            </button>
          </div>
        </form>
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="">
        <form method="POST" onSubmit={onMint}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto text-left mt-8">
            <div>
              <label>Mint to</label>
              <input
                name="mintToAddress"
                value={mintInputs.mintToAddress || ""}
                onChange={handleMintChange}
                placeholder="Enter the address to mint the stablecoin to"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                name="amount"
                value={mintInputs.amount || ""}
                onChange={handleMintChange}
                type="text"
                placeholder="Enter stablecoin amount"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="mr-auto text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ml-auto"
            >
              Mint
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

