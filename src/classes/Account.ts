import { OfflineAminoSigner } from "@cosmjs/amino";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { Chain } from "./Chain";

export type AccountConfig = {
  chain: Chain;
  address: string;
  signer: OfflineAminoSigner
};

export class Account {
  public address: string;

  public chain: Chain;

  public signer: OfflineSigner;

  constructor(public config: AccountConfig) {
    this.address = config.address;
    this.chain = config.chain;
    this.signer = config.signer;
  }
}
