import React from "react";
import group from "../images/group.png";
import {
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  editionDropAddress,
  editionDropTokenId,
} from "../../const/yourDetails";

export default function CommunityDetails() {
  const address = useAddress();
  const { contract: editionDropContract } = useContract(editionDropAddress);
  const { data: nft, isLoading: isNftLoading } = useNFT(
    editionDropContract,
    editionDropTokenId
  );
  const { data: ownedNfts, refetch: refetchOwnedNfts } = useOwnedNFTs(
    editionDropContract,
    address
  );

  return (
    <div className="mx-auto justify-center landing-page">
      {isNftLoading ? (
        <div className="text-center mt-8 font-bold text-2xl">
          Loadiing... Please wait...
        </div>
      ) : ownedNfts && ownedNfts?.length > 0 ? (
        <div className="text-left">
          <div className="w-100 bg-blue-800 flex pt-8 pb-12 py-10">
            <div className="mr-auto pl-10">
              <h1 className="text-xl md:text-5xl font-bold text-white align-middle mt-10 md:ml-10">
                Welcome to the <br /> Demo Community
              </h1>
              <button className="bg-white px-2 text-sm md:text-xl md:px-5 py-2 rounded-lg md:ml-10 mt-9">
                Go to gourp Chat
              </button>
            </div>
            <div className="mx-auto pr-10">
              <img
                src={group}
                className="mx-auto mt-9 md:mt-1 w-[100px] md:w-[300px]"
                alt=""
              />
            </div>
          </div>
          <div className="mx-auto px-2 pt-8 h-100">
            <h2 className="text-center text-2xl font-bold">
              This is our Demo community page!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 px-10 mx-auto">
              <div className="posts px-5 py-6">
                <div className="w-100 px-4 py-4 rounded-lg bg-gray-300 shadow-lg">
                  <h2 className="text-xl font-bold">This is a demo Post!</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <button className="bg-blue-800 text-white px-5 py-2 rounded-lg mt-9">
                    Check Post
                  </button>
                </div>
              </div>
              <div className="posts px-5 py-6">
                <div className="w-100 px-4 py-4 rounded-lg bg-gray-300 shadow-lg">
                  <h2 className="text-xl font-bold">This is a demo Post!</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <button className="bg-blue-800 text-white px-5 py-2 rounded-lg mt-9">
                    Check Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modalDiv text-center">
          <h1 className="text-2xl font-bold mb-8">
            Please buy Membership First!
          </h1>
          {isNftLoading ? (
            "Loading..."
          ) : (
            <div className="mx-auto">
              <p>Acics Membership Pass</p>
              <img
                className="nftImage mx-auto mt-2 border border-gray-300 rounded-lg"
                src={nft.metadata.image}
                alt={nft.metadata.description}
              />
              {address ? (
                <>
                  <p>
                    You own {ownedNfts?.[0]?.quantityOwned || "0"}{" "}
                    <a href="https://goerli.etherscan.io/nft/0x8d9919db3cd6af84e8a12cedc3c5a694bf026ab8/0">
                      NFT(s)
                    </a>
                    .
                  </p>
                  <Web3Button
                    contractAddress={editionDropAddress}
                    action={(contract) =>
                      contract.erc1155.claim(editionDropTokenId, 1)
                    }
                    onSuccess={async () => {
                      await refetchOwnedNfts();
                      //   return navigate("/community-details");
                    }}
                    style={{
                      width: "30%",
                      marginTop: "30px",
                      backgroundColor: "#B49A8B",
                    }}
                  >
                    Claim The NFT!
                  </Web3Button>
                </>
              ) : (
                <p>Connect your wallet first to buy the membership!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
