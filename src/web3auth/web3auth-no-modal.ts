import type { WalletConfig } from "@thirdweb-dev/react-core";
import {
  AbstractClientWallet,
  ConnectParams,
  Connector,
  WalletOptions,
} from "@thirdweb-dev/wallets";
import type { Chain } from "@thirdweb-dev/chains";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { ethers, Signer, utils } from "ethers";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

export type Web3AuthConnectorOptions = {
  chain: Chain;
  clientId: string;
};

export type Web3AuthConnectionArgs = {};

export class Web3AuthConnector extends Connector<Web3AuthConnectionArgs> {
  options: Web3AuthConnectorOptions;
  web3auth?: Web3AuthNoModal;
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
    const openloginAdapter = new OpenloginAdapter();
    const chainConfig = {
      rpcTarget: this.options.chain.rpc[0].replace(
        "${THIRDWEB_API_KEY}",
        "6def93e4d59f3aab527d02598ea4e399"
      ),
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x" + options.chainId?.toString(16),
      displayName: "Arbitrum Sepolia",
      blockExplorer: "`https://testnet.arbiscan.io`",
      ticker: "ETH",
      tickerName: "Ethereum",
    };
    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: { chainConfig },
    });
    this.web3auth = new Web3AuthNoModal({
      clientId: options.clientId,
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // Web3Auth Network
      privateKeyProvider,
    });
    this.web3auth.configureAdapter(openloginAdapter);
    await this.web3auth.init();
    if (this.web3auth.connected) {
      this.provider = this.web3auth?.provider;
    } else {
      this.provider = await this.web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "google",
      });
    }
  }

  async connect(args?: ConnectParams<Web3AuthConnectionArgs>) {
    await this.initializeSDK(this.options.chain.chainId);
    console.log("web3auth SDK initialized.");
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
    console.log("getSigner()", await this.getProvider());
    const provider = new ethers.providers.Web3Provider(
      (await this.getProvider()) as any // TODO: fix type mismatch
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
> {
  connector?: Connector;
  options: WalletOptions<Web3AuthConnectorOptions>;
  constructor(options?: WalletOptions<Web3AuthConnectorOptions>) {
    super("GoogleAuth", options);
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

const googleIcon =
  "https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/544/Google__G__Logo-512.png";

export const googleWeb3Wallet = (
  config: Web3AuthConnectorOptions
): WalletConfig<Web3AuthWallet> => {
  return {
    id: "googleAuthWallet",
    meta: {
      name: "Google",
      iconURL: googleIcon,
    },
    create: (options: WalletOptions) =>
      new Web3AuthWallet({ ...options, ...config }),
  };
};
