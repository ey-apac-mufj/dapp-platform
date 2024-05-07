import { ArbitrumSepolia, Localhost } from "@thirdweb-dev/chains";

export const TWFactoryAddress = "0x3Cf4377920FF73b9946eeA5D62Be757c075a8f5d";
export const TWApiKey =
  "Pp-yMCi3csVA2NBc5trHpLHyT5uErD1q-ZDVzriH4gPEhkW-sGdPXT72UFXDStwm6RwHY2ZqwgqKip-dZoCM9Q";
export const TWClientID = "6def93e4d59f3aab527d02598ea4e399";

export const apiurl = "https://medi-lx.xyz";
export const vcAPI = "https://vc-api.mullet.one";
export const activeChain = ArbitrumSepolia;

export const editionDropAddress = "0x8D9919db3CD6aF84e8A12CedC3c5A694Bf026aB8";
export const editionDropTokenId = "0";

export const magicLinkKey = "pk_live_41D75AEA3BB94386";

export const walletConnetKey = "4078812e3d11593676900b0dd00d15dc";

export const userTypes = {
  talent: 10,
  instructor: 20,
  employer: 30,
};

export const messageToSign = "ThisMessageIsForSigning";
export const vcStoreAddress = "0xAE05e28134d91f66db8195B1AF1aE95a3CFA14FC";

export const vcContractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_type",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_version",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_encryptedCredential",
        type: "string",
      },
    ],
    name: "addCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_type",
        type: "uint256",
      },
    ],
    name: "getCredentials",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "version",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "encryptedCredential",
            type: "string",
          },
        ],
        internalType: "struct VerifiableCredentialStorage.Credential[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
