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
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const { contract: editionDropContract } = useContract(editionDropAddress);
  const { data: nft, isLoading: isNftLoading } = useNFT(
    editionDropContract,
    editionDropTokenId
  );
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
      {loading ? (
        <div className="text-center mt-8 font-bold text-2xl">
          Loading... Please wait...
        </div>
      ) : (
        <CommunityLanding />
      )}
    </div>
  );
}
