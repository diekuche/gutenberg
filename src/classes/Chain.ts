import { OfflineAminoSigner } from "@cosmjs/amino";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  GasPrice, QueryClient, calculateFee, setupBankExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ChainConfig } from "config/chains";
import { ChainCosmwasmConfig, GasLimit, chainCosmwasmConfigs } from "config/cosmwasm";
import { QueryCache } from "./QueryCache";

export class Chain {
  protected cosmWasmClient?: CosmWasmClient;

  protected tendermint?: Tendermint34Client;

  protected queryClient?: QueryClient;

  protected cosmWasmClients: Map<OfflineAminoSigner, SigningCosmWasmClient> = new Map();

  cosmwasmConfigs: ChainCosmwasmConfig;

  cache: QueryCache;

  constructor(public config: ChainConfig) {
    this.cosmwasmConfigs = chainCosmwasmConfigs[config.chainId];
    this.cache = new QueryCache({
      prefix: config.chainId,
    });
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

  async query<T>({
    queryKey,
    queryFn,
    cacheTime,
  }: {
    queryKey: string;
    queryFn: (context: { chain: Chain }) => T | Promise<T>;
    cacheTime?: number;
  }, options?: { cacheTime?: number }): Promise<T> {
    return this.cache.getOrUpdate(
      {
        queryKey,
        queryFn,
        cacheTime,
      },
      { chain: this },
      options,
    );
  }

  invalidate = this.query.bind(this);

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

  calculateFee(gasLimit: GasLimit) {
    const currency = this.config.feeCurrencies[0];
    return calculateFee(
      this.cosmwasmConfigs.gasLimits[gasLimit],
      GasPrice.fromString(`${currency.gasPriceStep?.low || "0.0001"}${currency.coinMinimalDenom}`),
    );
  }
}
