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
import SwitchLanguage from "../components/SwitchLanguage";
import { useTranslation } from "react-i18next";

export default function CommunityDetails() {
  const { t } = useTranslation();
  const address = useAddress(); // Provided by thirdweb for getting connected wallet address
  const [loading, setLoading] = useState(false);
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
      {/* If wallet has particular NFT then show landing page else show Purchase NFT component */}
      {loading ? (
        <div className="text-center mt-8 font-bold text-2xl">
          {t("Loading... Please wait...")}
        </div>
      ) : // ) : ownedNfts && ownedNfts?.length > 0 ? (
      true ? (
        // Commmunity landing Component
        <CommunityLanding t={t} />
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
          t={t}
        />
      )}
      <SwitchLanguage />
    </div>
  );
}
