import React, { useState, useEffect } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import Offer from "../components/Offer";
import jsonData from "../data.json";
import { useSDK } from "@thirdweb-dev/react";
import {
  useAddress,
} from "@thirdweb-dev/react";

import {
  splitMainAddress,
  splitDestinations,
  splitPercentages,
  stablecoinAddress,
  platformAddress,
  nurseAddress
} from "../../const/yourDetails";

const splitMainABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Create2Error",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CreateError",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newController",
        "type": "address"
      }
    ],
    "name": "InvalidNewController",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "accountsLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "allocationsLength",
        "type": "uint256"
      }
    ],
    "name": "InvalidSplit__AccountsAndAllocationsMismatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "InvalidSplit__AllocationMustBePositive",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "allocationsSum",
        "type": "uint32"
      }
    ],
    "name": "InvalidSplit__InvalidAllocationsSum",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "distributorFee",
        "type": "uint32"
      }
    ],
    "name": "InvalidSplit__InvalidDistributorFee",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "hash",
        "type": "bytes32"
      }
    ],
    "name": "InvalidSplit__InvalidHash",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "accountsLength",
        "type": "uint256"
      }
    ],
    "name": "InvalidSplit__TooFewAccounts",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "Unauthorized",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "CancelControlTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousController",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newController",
        "type": "address"
      }
    ],
    "name": "ControlTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "CreateSplit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "contract ERC20",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "distributorAddress",
        "type": "address"
      }
    ],
    "name": "DistributeERC20",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newPotentialController",
        "type": "address"
      }
    ],
    "name": "InitiateControlTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "UpdateSplit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "contract ERC20[]",
        "name": "tokens",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "tokenAmounts",
        "type": "uint256[]"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "PERCENTAGE_SCALE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "acceptControl",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "cancelControlTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint32[]",
        "name": "percentAllocations",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "distributorFee",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "controller",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "trigger",
        "type": "address"
      }
    ],
    "name": "createSplit",
    "outputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "trigger",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "deleteOffer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "internalType": "contract ERC20",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint32[]",
        "name": "percentAllocations",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "distributorFee",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "distributorAddress",
        "type": "address"
      }
    ],
    "name": "distributeAndWithdrawERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "internalType": "contract ERC20",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint32[]",
        "name": "percentAllocations",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "distributorFee",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "distributorAddress",
        "type": "address"
      }
    ],
    "name": "distributeERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "getController",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "contract ERC20",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "getERC20Balance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "getHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "getNewPotentialController",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getOffersReceivedByAddress",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "name": "makeSplitImmutable",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "offersReceivedByAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint32[]",
        "name": "percentAllocations",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "distributorFee",
        "type": "uint32"
      }
    ],
    "name": "predictImmutableSplitAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "internalType": "contract ERC20",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint32[]",
        "name": "percentAllocations",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "distributorFee",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "distributorAddress",
        "type": "address"
      }
    ],
    "name": "returnDeposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newController",
        "type": "address"
      }
    ],
    "name": "transferControl",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint32[]",
        "name": "percentAllocations",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "distributorFee",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "distributorAddress",
        "type": "address"
      }
    ],
    "name": "updateERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "split",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint32[]",
        "name": "percentAllocations",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "distributorFee",
        "type": "uint32"
      }
    ],
    "name": "updateSplit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "walletImplementation",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "contract ERC20[]",
        "name": "tokens",
        "type": "address[]"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

export default function NurseOffers() {
  const sdk = useSDK(); // Get SDK
  const address = useAddress();

  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function getOffers() {
      if (address) {
        const splitMainContract = await sdk.getContract(splitMainAddress, splitMainABI);
        const offers = await splitMainContract.call(
          "getOffersReceivedByAddress",
          [
            address
          ]
        );
        setOffers(offers);
      };

    }
    getOffers();
  }, [address]);

  const onAccept = async (splitAddress) => {
    const splitMainContract = await sdk.getContract(splitMainAddress, splitMainABI);
    const PERCENTAGE_SCALE = 1000000;
    const percentAllocations = [
      PERCENTAGE_SCALE * splitPercentages[0], 
      PERCENTAGE_SCALE * splitPercentages[1],
      PERCENTAGE_SCALE * splitPercentages[2]
    ];
    const data = await splitMainContract.call(
      "distributeAndWithdrawERC20",
      [
        splitAddress,
        stablecoinAddress,
        splitDestinations,
        percentAllocations,
        0,
        address
      ],
    );
  };

  const onDecline = async (splitAddress) => {
    const splitMainContract = await sdk.getContract(splitMainAddress, splitMainABI);
    const PERCENTAGE_SCALE = 1000000;
    const percentAllocations = [
      PERCENTAGE_SCALE * splitPercentages[0], 
      PERCENTAGE_SCALE * splitPercentages[1],
      PERCENTAGE_SCALE * splitPercentages[2]
    ];
    const data = await splitMainContract.call(
      "returnDeposit",
      [
        splitAddress,
        stablecoinAddress,
        splitDestinations,
        percentAllocations,
        0,
        address
      ],
    );
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-40 py-5 justify-center">
      <h5 className="font-medium text-2xl">My Offers</h5>
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto mt-8">
        {offers.map((offer, i) => {
          return <Offer offer={{
            "id": i,
            "company": "XYZ Corporation Inc",
            "salary": "$10000",
            "jobDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur fermentum sapien, a luctus tellus facilisis a. Integer felis erat, vestibulum ut sollicitudin nec, bibendum at ipsum.",
            "contract": offer
          }} key={i} onAccept={onAccept} onDecline={onDecline} />;
        })}
      </div>
    </div>
  );
}
