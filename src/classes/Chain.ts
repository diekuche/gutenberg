import { fromBech32 } from "@cosmjs/encoding";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  GasPrice, QueryClient, SigningStargateClient, calculateFee, setupBankExtension,
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ChainConfig } from "config/chains";
import { ChainCosmwasmConfig, GasLimit, chainCosmwasmConfigs } from "config/cosmwasm";
import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { MsgBurn, MsgCreateDenom, MsgMint } from "generated/proto/osmosis/tokenfactory/v1beta1/tx";
import { QueryCache } from "./QueryCache";

export class Chain {
  protected cosmWasmClient?: CosmWasmClient;

  protected tendermint?: Tendermint34Client;

  protected queryClient?: QueryClient;

  protected cosmWasmClients: Map<OfflineSigner, SigningCosmWasmClient> = new Map();

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

  async getSigningCosmWasmClient(signer: OfflineSigner) {
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

  async getSigningStargateClient(signer: OfflineSigner) {
    const registry = new Registry();
    if (this.config.features?.includes("tokenfactory")) {
      registry.register("/osmosis.tokenfactory.v1beta1.MsgCreateDenom", MsgCreateDenom as unknown as GeneratedType);
      registry.register("/osmosis.tokenfactory.v1beta1.MsgMint", MsgMint as unknown as GeneratedType);
      registry.register("/osmosis.tokenfactory.v1beta1.MsgBurn", MsgBurn as unknown as GeneratedType);
    }
    const signingStargateClient = await SigningStargateClient.createWithSigner(
      await this.getTendermint(),
      signer,
      {
        registry,
      },
    );
    return signingStargateClient;
  }

  calculateFee(gasLimit: GasLimit) {
    const currency = this.config.feeCurrencies[0];
    return calculateFee(
      this.cosmwasmConfigs.gasLimits[gasLimit],
      GasPrice.fromString(`${currency.gasPriceStep?.low || "0.0001"}${currency.coinMinimalDenom}`),
    );
  }

  validateAddress(address: string) {
    if (!address.startsWith(this.config.bech32Config.bech32PrefixAccAddr)) {
      return false;
    }
    try {
      fromBech32(address);
      return true;
    } catch (e) {
      return false;
    }
  }
}
