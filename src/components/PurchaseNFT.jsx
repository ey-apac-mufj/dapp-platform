import { Web3Button } from "@thirdweb-dev/react";
import React from "react";

export default function PurchaseNFT({
  isNftLoading,
  address,
  nft,
  editionDropAddress,
  ownedNfts,
  refetchOwnedNfts,
  editionDropTokenId,
}) {
  return (
    <div className="modalDiv text-center">
      <h1 className="text-2xl font-bold mb-8">
        Please initialize your wallet account
      </h1>
      {/* If NFT is loading show loading message */}
      {isNftLoading ? (
        "Loading..."
      ) : (
        <div className="mx-auto">
          {/* Check if address is available */}
          {address ? (
            <>
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
                Initialize your wallet account
              </Web3Button>
            </>
          ) : (
            <p>Connect your Mullet and initialize your wallet account!</p>
          )}
        </div>
      )}
    </div>
  );
}
