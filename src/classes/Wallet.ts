import { AccountData, Keplr } from "@keplr-wallet/types";

export class Wallet {
  keplr: Keplr;

  chainAccounts: Map<string, readonly AccountData[]> = new Map();

  constructor() {
    const { keplr } = window;
    if (!keplr) {
      throw new Error("Keplr is not connected");
    }
    this.keplr = keplr;
  }

  async getSigner(chainId: string) {
    const signer = this.keplr.getOfflineSigner(chainId);
    return signer;
  }

  async getAccounts(chainId: string) {
    let accounts = this.chainAccounts.get(chainId);
    if (!accounts) {
      const signer = await this.getSigner(chainId);
      accounts = await signer.getAccounts();
      this.chainAccounts.set(chainId, accounts);
    }
    return accounts;
  }

  async getMainAddress(chainId: string) {
    return this.getAccounts(chainId).then((accounts) => accounts[0].address);
  }
}
