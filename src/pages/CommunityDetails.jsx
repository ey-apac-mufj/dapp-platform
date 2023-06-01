import React from "react";
import {
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import {
  editionDropAddress,
  editionDropTokenId,
} from "../../const/yourDetails";
import CommunityLanding from "../components/CommunityLanding";
import PurchaseNFT from "../components/PurchaseNFT";

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
    <>
      {isNftLoading ? (
        <div className="text-center mt-8 font-bold text-2xl">
          Loading... Please wait...
        </div>
      ) : ownedNfts && ownedNfts?.length > 0 ? (
        <CommunityLanding />
      ) : (
        <PurchaseNFT
          isNftLoading={isNftLoading}
          address={address}
          nft={nft}
          editionDropAddress={editionDropAddress}
          editionDropTokenId={editionDropTokenId}
          ownedNfts={ownedNfts}
          refetchOwnedNfts={refetchOwnedNfts}
        />
      )}
    </>
  );
}
