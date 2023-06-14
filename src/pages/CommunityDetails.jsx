import React, { useEffect, useState } from "react";
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
  const address = useAddress(); // Provided by thirdweb for getting connected wallet address
  const [loading, setLoading] = useState(true);
  const { contract: editionDropContract } = useContract(editionDropAddress); // Dummy NFT details

  // fetch NFT details
  const { data: nft, isLoading: isNftLoading } = useNFT(
    editionDropContract,
    editionDropTokenId
  );

  // Fetch details of nfts owned by wallet
  const { data: ownedNfts, refetch: refetchOwnedNfts } = useOwnedNFTs(
    editionDropContract,
    address
  );

  useEffect(() => {
    if (ownedNfts) {
      setTimeout(() => {
        setLoading(false);
      }, 50);
    }
  }, [ownedNfts]);

  return (
    <div>
      {/* if wallet has particular NFT then show landing page else show Purchase NFT component */}
      {loading ? (
        <div className="text-center mt-8 font-bold text-2xl">
          Loading... Please wait...
        </div>
      ) : ownedNfts && ownedNfts?.length > 0 ? (
        // Commmunity landing Component
        <CommunityLanding />
      ) : (
        // Purchase NFT Component
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
    </div>
  );
}
