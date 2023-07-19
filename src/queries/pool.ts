import { Chain } from "classes/Chain";
import { SwapPoolQueryClient } from "generated/SwapPool.client";
import { SwapPoolFactoryQueryClient } from "generated/SwapPoolFactory.client";

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
