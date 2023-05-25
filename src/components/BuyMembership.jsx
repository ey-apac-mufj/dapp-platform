import { Web3Button } from "@thirdweb-dev/react";
import React from "react";
import Modal from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";

export default function BuyMembership({
  open,
  onOpenModal,
  onCloseModal,
  address,
  editionDropAddress,
  editionDropTokenId,
  refetchOwnedNfts,
  ownedNfts,
  isNftLoading,
  nft,
}) {
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      classNames={{ modal: "customModal" }}
      center
    >
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
                    return navigate("/community-details");
                  }}
                  style={{
                    width: "60%",
                    marginTop: "10px",
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
    </Modal>
  );
}
