import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import "./styles/Home.css";
import { editionDropAddress, editionDropTokenId } from "../const/yourDetails";

export default function Home() {
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
    <div className="container">
      <main className="main">
        <div className="connect">
          <ConnectWallet
            dropdownPosition={{
              align: "center",
              side: "bottom",
            }}
            btnTitle="Login"
          />
        </div>
        <h1 className="title">
          Welcome to <a href="https://thirdweb.com/">Acics NFT Drop Page</a>!
        </h1>

        <p className="description">
        Please connect to your <a href="https://goerli.etherscan.io/address/0x90A063aeC1412bEfE6E0977fbAd0A8dc9D8a2EE3">MUFG Smart Contract Wallet (ERC-4337)</a>.
        </p>

        {isNftLoading ? (
          "Loading..."
        ) : (
          <div className="card">
            <p>Acics Membership Pass</p>
            <img
              className="nftImage"
              src={nft.metadata.image}
              alt={nft.metadata.description}
            />
            {address ? (
              <>
                <p>You own {ownedNfts?.[0]?.quantityOwned || "0"} <a href="https://goerli.etherscan.io/nft/0x8d9919db3cd6af84e8a12cedc3c5a694bf026ab8/0">NFT(s)</a>.</p>
                <Web3Button
                  contractAddress={editionDropAddress}
                  action={(contract) =>
                    contract.erc1155.claim(editionDropTokenId, 1)
                  }
                  onSuccess={async () => {
                    await refetchOwnedNfts();
                    alert("Claim successful!");
                  }}
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  Mint NFT Drop!
                </Web3Button>
              </>
            ) : (
              <p>Login to mint NFT drop!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
