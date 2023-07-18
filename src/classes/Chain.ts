import { OfflineAminoSigner } from "@cosmjs/amino";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { QueryClient, setupBankExtension } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ChainConfig } from "config/chains";

export class Chain {
  protected cosmWasmClient?: CosmWasmClient;

  protected tendermint?: Tendermint34Client;

  protected queryClient?: QueryClient;

  protected cosmWasmClients: Map<OfflineAminoSigner, SigningCosmWasmClient> = new Map();

  constructor(public config: ChainConfig) {

  }

  async getTendermint(): Promise<Tendermint34Client> {
    if (!this.tendermint) {
      this.tendermint = await Tendermint34Client.connect(this.config.rpc);
    }
    return this.tendermint;
  }

  async getQueryClient(): Promise<QueryClient> {
    if (!this.queryClient) {
      this.queryClient = new QueryClient(await this.getTendermint());
    }
    return this.queryClient;
  }

  async bank() {
    const { bank } = setupBankExtension(await this.getQueryClient());
    return bank;
  }

  async getCosmWasmClient() {
    if (!this.cosmWasmClient) {
      this.cosmWasmClient = await CosmWasmClient.create(await this.getTendermint());
    }
    return this.cosmWasmClient;
  }

  async getSigningCosmWasmClient(signer: OfflineAminoSigner) {
    let cosmWasmClient = this.cosmWasmClients.get(signer);
    if (!cosmWasmClient) {
      cosmWasmClient = await SigningCosmWasmClient.createWithSigner(
        await this.getTendermint(),
        signer,
      );
      this.cosmWasmClients.set(signer, cosmWasmClient);
    }
    return cosmWasmClient;
  }
}
