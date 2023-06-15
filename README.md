# MULLET DApp Platform

> In this project using React.js, React Router and Tailwind CSS are used to develop the UI. Thirdweb (https://thirdweb.com/) library is used for interacting with blockchain.

> In this project you can connect to ERC 4337 wallet using your personal MULLET wallet. Then you can check the list of communities based on the categories. You can enter into a particular category by purchasing their NFT. Once you have the NFT you can enjoy the features of the community.

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
