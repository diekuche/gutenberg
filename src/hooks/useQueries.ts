import { useMemo } from "react";
import { useAccount } from "graz";
import { useContracts } from "./useContracts";
import { Denom } from "../ts/SwapPoolFactory.types";
import { useQueryCache } from "./useQueryCache";
import { InfoResponse } from "../ts/SwapPool.types";
import { QueryCache, QueryGetParams } from "../utils/QueryCache";

export type TokenDetails = {
  denom: Denom;
  type: "cw20" | "tokenfactory" | "native";
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  logo?: string;
};

export type UserTokenDetails = TokenDetails & {
  balance: string;
};

export type PoolInfo = InfoResponse;

export type QueryContext = {
  cache: QueryCache;
  contracts: NonNullable<ReturnType<typeof useContracts>>;
};

export const CW20_TOKEN_INFO = (tokenAddr: string) => ({
  queryKey: `/token/${tokenAddr}/info`,
  queryFn: ({ contracts }: QueryContext) => {
    const token = contracts.Cw20ContractFactory(tokenAddr).querier;
    return token.tokenInfo();
  },
});

export const CW20_TOKEN_MARKETING = (tokenAddr: string) => ({
  queryKey: `/token/${tokenAddr}/marketing`,
  queryFn: ({ contracts }: QueryContext) => {
    const token = contracts.Cw20ContractFactory(tokenAddr).querier;
    return token.marketingInfo();
  },
});

export const CW20_TOKEN_LOGO = (tokenAddr: string) => ({
  queryKey: `/token/${tokenAddr}/logo`,
  queryFn: ({ contracts }: QueryContext) => {
    const token = contracts.Cw20ContractFactory(tokenAddr).querier;
    return token.downloadLogo();
  },
});

export const CW20_TOKEN_DETAILS = (tokenAddr: string) => ({
  queryKey: `/v0.1/token/${tokenAddr}/details`,
  queryFn: async (context: QueryContext): Promise<TokenDetails> => {
    const { cache } = context;
    const info = await cache.getOrUpdate(CW20_TOKEN_INFO(tokenAddr), context);
    const marketing = await cache.getOrUpdate(CW20_TOKEN_MARKETING(tokenAddr), context);

    const logo = marketing?.logo === "embedded"
      ? (await cache.getOrUpdate(CW20_TOKEN_LOGO(tokenAddr), context)).data
      : marketing.logo?.url;
    return {
      type: "cw20",
      denom: {
        cw20: tokenAddr,
      },
      address: tokenAddr,
      name: info.name,
      decimals: info.decimals,
      symbol: info.symbol,
      logo,
    };
  },
});

export const SWAP_POOL_INFO = (poolAddress: string) => ({
  queryKey: `/pool/${poolAddress}/info`,
  queryFn: ({ contracts }: QueryContext) => {
    const pool = contracts.PoolContractFactory(poolAddress).querier;
    return pool.info();
  },
  cacheTime: 60 * 1000,
});

export const SWAP_POOL_LIST = () => ({
  queryKey: "/pools",
  queryFn: ({ contracts }: QueryContext) => contracts.poolFactory.querier.getPools(),
  cacheTime: 1 * 60 * 1000,
});

export const CW20_USER_BALANCE = (
  tokenAddr: string,
  userAddress: string,
) => ({
  queryKey: `/user/${userAddress}/token/${tokenAddr}/balance`,
  queryFn: async ({ contracts }: QueryContext) => {
    const token = contracts.Cw20ContractFactory(tokenAddr).querier;
    return (await token.balance({ address: userAddress })).balance;
  },
  cacheTime: 5 * 60 * 1000,
});

export const CW20_USER_TOKEN_DETAILS = (
  tokenAddress: string,
  userAddress: string,
) => ({
  queryKey: `/v0.1/user/${userAddress}/cw20/${tokenAddress}/details`,
  queryFn: async (context: QueryContext): Promise<UserTokenDetails> => {
    const { cache } = context;
    const details = await cache.getOrUpdate(CW20_TOKEN_DETAILS(tokenAddress), context);
    const balance = await cache.getOrUpdate(CW20_USER_BALANCE(tokenAddress, userAddress), context);
    return {
      balance,
      ...details,
    };
  },
  cacheTime: 1,
});

export const USER_TOKEN_DETAILS = (denom: Denom, userAddress: string) => {
  if ("native" in denom) {
    throw new Error("Native token still not implemented");
  }
  return {
    queryKey: `/v0.1/user/${userAddress}/token/${denom.cw20}/details`,
    queryFn: (
      context: QueryContext,
    ): Promise<UserTokenDetails> => context.cache.getOrUpdate(CW20_USER_TOKEN_DETAILS(
      denom.cw20,
      userAddress,
    ), context),
    cacheTime: 1,
  };
};

export const POOL_TOKEN1_FOR_TOKEN2_PRICE = (poolAddress: string, token1Amount: string) => ({
  queryKey: `/pool/${poolAddress}/token1ForToken2Price`,
  queryFn: async ({ contracts }: QueryContext) => {
    const pool = contracts.PoolContractFactory(poolAddress).querier;
    const res = (await pool.token1ForToken2Price({
      token1Amount,
    }).catch((e: unknown) => {
      if (typeof e !== "undefined" && (e as Error).toString().includes("No liquidity")) {
        return {
          token2_amount: "0",
        };
      }
      throw e;
    })).token2_amount;
    return res;
  },
  cacheTime: 1000,
});

export const useQueries = () => {
  const cache = useQueryCache();
  const contracts = useContracts();
  const { data: account } = useAccount();
  return useMemo(() => {
    if (!contracts) {
      return undefined;
    }
    return {
      contracts,
      cache,
      query: <C, T>(params: QueryGetParams<C, T>, options?: {
        cacheTime?: number
      }) => cache.getOrUpdate(params, {
        cache,
        contracts,
      }, options),
    };
  }, [account, contracts, cache]);
};

export type Queries = NonNullable<ReturnType<typeof useQueries>>;
