# DApp Platform

This DApp implements ERC4337 smart wallet functionalities using Thirdweb and Web3Auth features. It allows users to sign in with Google account and connect their wallet using WalletConnect.

In this project React.js, React Router and Tailwind CSS are used to develop the UI. Thirdweb (https://thirdweb.com/) library is used for interacting with blockchain.

## Getting started

Clone this repository and run the following command in the project directory:

```bash
# npm
npm install

# yarn
yarn install
```

This should install all the required dependencies for this project.

## Project Structure

- The `main.jsx` file is the entry point of the application.
- In `App.jsx` all the routes are defined and mapped with the proper files.
- Under `pages` folder all the route pages are defined.
- Under `components` folder all the reusable components are defined.
- Under `styles` folder all the CSS styles are defined.
- The `data.json` file is used for dummy data used in the development.

## Adding details

Check `const/yourDetails.js` file and add all the details specified. This includes:

- `TWFactoryAddress`: Address of the deployed thirdweb account factory contract
- `TWApiKey`: thirdweb API key that you can generate from [thirdweb dashboard](https://thirdweb.com/dashboard/api-keys).
- `activeChain`: The chain your account factory is deployed on. Recommended to import from the `@thirdweb-dev/chains` package.
- `editionDropAddress`: Address for your deployed [Edition Drop](https://thirdweb.com/thirdweb.eth/DropERC1155) contract.
- `editionDropTokenId`: Token ID to claim from the edition drop contract.
- `magicLinkKey`: Private key for Magic Link (Email based personal wallet system).
- `walletConnetKey`: Secret token for wallet connect.

## Configuring Thirdweb

Configure the ThirdwebProvider component in your main application file (main.jsx) to use the Thirdweb and Web3Auth features. Please follow `src/main.jsx` and `src/web3auth/web3auth-no-modal.ts` files.

```bash
<ThirdwebProvider
    supportedChains={[activeChain]}
    activeChain={activeChain}
    supportedWallets={[
    smartWallet({
        factoryAddress: TWFactoryAddress,
        clientId: TWClientID,
        gasless: true,
        personalWallets: [
        googleWeb3Wallet({
            chain: activeChain,
            clientId: 'YOUR_GOOGLE_CLIENT_ID',
        }),
        walletConnect({
            projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID',
        }),
        ],
    }),
    ]}
>
    <App />
</ThirdwebProvider>
```

## Configuring VC Verification

Configure Web DID Resolver to verify Verifiable Credentials. Please follow `src/pages/LoginPage.jsx` file for more details.

Install the necessary packages

```bash
npm install web-did-resolver did-jwt-vc did-resolver
```

Initializing the resolver (`src/pages/LoginPage.jsx` file, line no. 39)

```bash
const webResolver = getResolver();
const resolver = new Resolver({
...webResolver,
});
```

Verifying VC (`src/pages/LoginPage.jsx` file, line no. 105, `verifyVC()` function)

```bash
const verifiedVC = await verifyCredential(currentVC.proof.jwt, resolver);
let vcMatching = _.isEqual(currentVC, verifiedVC?.verifiableCredential);
console.log(vcMatching); // Boolean
```

## Running the app

Use the following command to run the app:

```bash
# npm
npm run dev

# yarn
yarn dev
```

## Deploying to IPFS

Use the following command to deploy this app to IPFS:

```bash
# npm
npm run deploy

# yarn
yarn deploy
```
