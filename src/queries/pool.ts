import { Chain } from "classes/Chain";
import { SwapPoolQueryClient } from "generated/SwapPool.client";
import { SwapPoolFactoryQueryClient } from "generated/SwapPoolFactory.client";
import { PoolDenom, TokenDetails } from "types/tokens";
import { NATIVE_TOKEN_DETAILS } from "./native";
import { CW20_TOKEN_DETAILS } from "./cw20";

export const SWAP_POOL_INFO = (poolAddress: string) => ({
  queryKey: `/pool/${poolAddress}/info`,
  queryFn: async ({ chain }: {
    chain: Chain
  }) => {
    const pool = new SwapPoolQueryClient(await chain.getCosmWasmClient(), poolAddress);
    return pool.info();
  },
  cacheTime: 60 * 1000,
});

export const SWAP_POOL_LIST = (factoryAddr: string) => ({
  queryKey: `/v0.1/factory/${factoryAddr}/pools`,
  queryFn: async ({ chain }: { chain: Chain }) => {
    try {
      const factory = new SwapPoolFactoryQueryClient(await chain.getCosmWasmClient(), factoryAddr);
      const pools = await factory.getPools();
      return pools;
    } catch (e) {
      if (`${e}`.includes("Cannot read properties of undefined (reading 'length')")) {
        return {
          pools: [],
        };
      }
      throw e;
    }
  },
  cacheTime: 1 * 60 * 1000,
});

export const POOL_TOKEN_DETAILS = (denom: PoolDenom): {
  queryKey: string;
  queryFn: (context: {
    chain: Chain
  }) => Promise<TokenDetails>
} => {
  if ("native" in denom) {
    return NATIVE_TOKEN_DETAILS(denom);
  }
  return {
    queryKey: `/v0.1/cw20/${denom.cw20}/details`,
    queryFn: (context: {
      chain: Chain
    }) => CW20_TOKEN_DETAILS(
      denom.cw20,
    ).queryFn(context),
  };
};
