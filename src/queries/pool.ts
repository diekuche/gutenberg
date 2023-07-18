import { Chain } from "classes/Chain";

export const SWAP_POOL_INFO = (poolAddress: string) => ({
  queryKey: `/pool/${poolAddress}/info`,
  queryFn: ({ chain }: {
    chain: Chain
  }) => {
    const pool = contracts.PoolContractFactory(poolAddress).querier;
    return pool.info();
  },
  cacheTime: 60 * 1000,
});

export const SWAP_POOL_LIST = (factoryAddr: string) => ({
  queryKey: `/v0.1/factory/${factoryAddr}/pools`,
  queryFn: async ({ contracts }: QueryContext) => {
    try {
      const pools = await contracts.PoolFactoryContractFactory(
        factoryAddr,
      ).querier.getPools();
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
