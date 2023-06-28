/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.30.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Decimal, InstantiateMsg, ExecuteMsg, Denom, Addr, QueryMsg, GetPoolsResponse } from "./SwapPoolFactory.types";
export interface SwapPoolFactoryReadOnlyInterface {
  contractAddress: string;
  getPools: () => Promise<GetPoolsResponse>;
}
export class SwapPoolFactoryQueryClient implements SwapPoolFactoryReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.getPools = this.getPools.bind(this);
  }

  getPools = async (): Promise<GetPoolsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_pools: {}
    });
  };
}
export interface SwapPoolFactoryInterface extends SwapPoolFactoryReadOnlyInterface {
  contractAddress: string;
  sender: string;
  createPool: ({
    lpFeePercent,
    token1Denom,
    token2Denom
  }: {
    lpFeePercent: Decimal;
    token1Denom: Denom;
    token2Denom: Denom;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class SwapPoolFactoryClient extends SwapPoolFactoryQueryClient implements SwapPoolFactoryInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.createPool = this.createPool.bind(this);
  }

  createPool = async ({
    lpFeePercent,
    token1Denom,
    token2Denom
  }: {
    lpFeePercent: Decimal;
    token1Denom: Denom;
    token2Denom: Denom;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      create_pool: {
        lp_fee_percent: lpFeePercent,
        token1_denom: token1Denom,
        token2_denom: token2Denom
      }
    }, fee, memo, _funds);
  };
}