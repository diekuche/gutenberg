import { AccountData, Keplr } from "@keplr-wallet/types";
import { Chain } from "./Chain";

export class Wallet {
  keplr?: Keplr;

  chainItems: Map<string, {
    enabled: boolean;
    accounts?: readonly AccountData[]
  }> = new Map();

  protected listeners: (()=>void)[] = [];

  constructor() {
    const { keplr } = window;
    if (!keplr) {
      console.log("Keplr is not installed");
    }
    this.keplr = keplr;
    window.addEventListener("keplr_keystorechange", () => {
      console.log("Key store in Keplr is changed. You may need to refetch the account info.");
      this.listeners.map((l) => l());
    });
  }

  public async connect(chain: Chain) {
    console.log(`Keplr connect to ${chain.config.chainId}`);
    const keplr = this.getKeplr();
    await keplr.experimentalSuggestChain(chain.config);
  }

  public async disconnect(chain: Chain) {
    const keplr = this.getKeplr();
    await keplr.disable(chain.config.chainId);
  }

  async getSigner(chainId: string) {
    const signer = this.getKeplr().getOfflineSignerOnlyAmino(chainId);
    return signer;
  }

  async getAccounts(chainId: string) {
    const chainItem = await this.getEnabledChainItem(chainId);
    let { accounts } = chainItem;
    if (!accounts) {
      const signer = await this.getSigner(chainId);
      accounts = await signer.getAccounts();
      chainItem.accounts = accounts;
    }
    return accounts;
  }

  async getAddress(chainId: string) {
    const keplr = this.getKeplr();
    const key = await keplr.getKey(chainId);
    return key.bech32Address;
  }

  onUpdate(listener: ()=>void) {
    this.listeners.push(listener);
  }

  offUpdate(listener: ()=>void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  protected async getEnabledChainItem(chainId: string) {
    const keplr = this.getKeplr();
    let chainItem = this.chainItems.get(chainId);
    if (!chainItem) {
      chainItem = {
        enabled: false,
        accounts: [],
      };
      this.chainItems.set(chainId, chainItem);
    }
    if (!chainItem.enabled) {
      await keplr.enable(chainId);
      chainItem.enabled = true;
    }
    return chainItem;
  }

  protected getKeplr() {
    if (!this.keplr) {
      throw new Error("Keplr is not installed");
    }
    return this.keplr;
  }
}
