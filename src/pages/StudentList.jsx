import React, { useState } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import CustomModal from "../components/CustomModal";
import StudentThumbnail from "../components/StudentThumbnail";
import StudentData from "../data.json";
import Student1 from "../images/student1.png";
import Student2 from "../images/student2.png";
import Student3 from "../images/student3.png";
import Student4 from "../images/student4.png";
import { useSDK } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";

import {
  splitMainAddress,
  splitDestinations,
  splitPercentages,
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

export default function StudentList() {
  const sdk = useSDK(); // Get SDK
  const [signature, setSignature] = useState(null);
  const [open, setOpen] = useState(false); // For modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();

  const imgArr = [Student1, Student2, Student3, Student4];

  const [inputs, setInputs] = useState({}); // For form

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onHireSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("i am here");
      const splitMainContract = await sdk.getContract(splitMainAddress, splitMainABI);
      const PERCENTAGE_SCALE = 1000000;
      const percentAllocations = [
        PERCENTAGE_SCALE * splitPercentages[0], 
        PERCENTAGE_SCALE * splitPercentages[1],
        PERCENTAGE_SCALE * splitPercentages[2]
      ];
      const data = await splitMainContract.call(
        "createSplit",
        [
          splitDestinations,
          percentAllocations,
          0,
          platformAddress,
          nurseAddress
        ],
      );
      const splitAddress = data.receipt.events[0].args[0];
      navigate("/deposit-contract/" + splitAddress);
      
      // console.log(signature);
      // if (signature && signature != undefined) {
      //   setSignature(signature);
      //   navigate("/deposit-contract");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const onHire = () => {
    // console.log("on hire");
    onOpenModal();
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center">
      <h5 className="text-center text-3xl font-thin antonFont">Student List</h5>
      <input
        type="text"
        className="w-90 md:w-80 mt-5 ml-2 pl-5 pr-3 py-2 rounded-full text-center"
        placeholder="Search Students"
      />
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mt-8">
        {StudentData.students.map((student, i) => {
          student.image = imgArr[i];
          return <StudentThumbnail student={student} onHire={onHire} key={i} />;
        })}
      </div>
      <CustomModal
        open={open}
        onCloseModal={onCloseModal}
        title="Submit Job Details"
      >
        <form method="POST" onSubmit={onHireSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto text-left mt-8">
            <div>
              <label>Company Name</label>
              <input
                name="companyName"
                value={inputs.companyName || ""}
                onChange={handleChange}
                placeholder="Enter Company Name"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div>
              <label>Salary</label>
              <input
                name="salary"
                value={inputs.salary || ""}
                onChange={handleChange}
                type="text"
                placeholder="Enter Salary details"
                className="form-control"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label>Job Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Job Description"
                name="jobDescription"
                value={inputs.jobDescription || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mr-auto text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ml-auto"
            >
              Submit Details
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}
