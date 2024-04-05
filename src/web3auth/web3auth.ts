import type { WalletConfig } from "@thirdweb-dev/react-core";
import { AbstractClientWallet, ConnectParams, Connector, WalletOptions } from "@thirdweb-dev/wallets";
import type { Chain } from "@thirdweb-dev/chains";
import { Web3Auth } from "@web3auth/modal";
import { ethers, Signer, utils } from "ethers";


export type Web3AuthConnectorOptions = {
	chain: Chain;
	clientId: string;
};

export type Web3AuthConnectionArgs = {};


export class Web3AuthConnector extends Connector<Web3AuthConnectionArgs> {
	options: Web3AuthConnectorOptions;
	web3auth?: Web3Auth;

	provider!: any;
	constructor(options: Web3AuthConnectorOptions) {
		super();

		this.options = options;
	}

	async initializeSDK(chainId: number) {
		const options = {
		  ...this.options,
		  chainId,
		};
		this.web3auth = new Web3Auth({
			clientId: options.clientId,
			web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
			chainConfig: {
				chainNamespace: "eip155",
				chainId: '0x' + options.chainId?.toString(16),
			},
		});
		await this.web3auth.initModal();
		await this.web3auth.connect();
	}

	async connect(args?: ConnectParams<Web3AuthConnectionArgs>) {
		await this.initializeSDK(this.options.chain.chainId);
		console.log('web3auth SDK initialized.');
		return await this.getAddress();
	}
	async disconnect() {
		await this.web3auth?.logout();
	}
	async getAddress(): Promise<string> {
		const signer = await this.getSigner();
    	return signer.getAddress();
	}
	async getSigner(): Promise<Signer> {
		console.log('getSigner()', await this.getProvider())
		const provider = new ethers.providers.Web3Provider(
			(await this.getProvider()) as any, // TODO: fix type mismatch
		);
		const signer = provider.getSigner();
		return signer;
	}
	async getProvider() {
		if (this.provider) {
			return this.provider;
		}
		this.provider = this.web3auth?.provider;
		return this.provider;
	}
	isConnected(): Promise<boolean> {
		return this.web3auth?.connected as any;
	}
	async switchChain(chainId: number): Promise<void> {}
	async setupListeners() {}
	updateChains(chains: Chain[]): void {}
}


export class Web3AuthWallet extends AbstractClientWallet<
	Web3AuthConnectorOptions,
	Web3AuthConnectionArgs
>{
	connector?: Connector;
	options: WalletOptions<Web3AuthConnectorOptions>;
	constructor(options?: WalletOptions<Web3AuthConnectorOptions>) {
		super("Web3Auth", options);
		this.options = options!;
	}
	initializeConnector() {
		this.connector = new Web3AuthConnector({
			chain: this.options?.chain,
			clientId: this.options?.clientId,
		});
		return this.connector;
	}
	async getConnector(): Promise<Connector> {
		if (!this.connector) {
			return this.initializeConnector();
		}
		return this.connector;
	}
	async autoConnect(options?: Web3AuthConnectionArgs) {
		this.initializeConnector();
		await this.connector?.connect();

		const isLoggedIn = await this.connector?.isConnected();
		if (isLoggedIn) {
		  return super.autoConnect(options);
		}

		throw new Error("Web3Auth user is not logged in");
	  }
}

const desktopIcon =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xXzY0KSIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMV82NCkiPgo8cGF0aCBkPSJNNTguNzUgMTkuMTY2N0gyMS4yNUMxOC45NTgzIDE5LjE2NjcgMTcuMDgzMyAyMS4wNDE3IDE3LjA4MzMgMjMuMzMzNFY0OC4zMzM0QzE3LjA4MzMgNTAuNjI1IDE4Ljk1ODMgNTIuNSAyMS4yNSA1Mi41SDM1LjgzMzNMMzEuNjY2NyA1OC43NVY2MC44MzM0SDQ4LjMzMzNWNTguNzVMNDQuMTY2NyA1Mi41SDU4Ljc1QzYxLjA0MTcgNTIuNSA2Mi45MTY3IDUwLjYyNSA2Mi45MTY3IDQ4LjMzMzRWMjMuMzMzNEM2Mi45MTY3IDIxLjA0MTcgNjEuMDQxNyAxOS4xNjY3IDU4Ljc1IDE5LjE2NjdaTTU4Ljc1IDQ0LjE2NjdIMjEuMjVWMjMuMzMzNEg1OC43NVY0NC4xNjY3WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzFfNjQiIHgxPSI0MCIgeTE9IjAiIHgyPSI0MCIgeTI9IjgwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNDRTExQUIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOTAwQkI1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMV82NCI+CjxyZWN0IHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1IDE1KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";

export const web3AuthWallet = (
	config: Web3AuthConnectorOptions
): WalletConfig<Web3AuthWallet> => {
	return {
		id: "Web3AuthWallet",
		meta: {
			name: "Web3Auth Wallet",
			iconURL: desktopIcon,
		},
		create: (options: WalletOptions) => new Web3AuthWallet({ ...options, ... config}),
	};
};

