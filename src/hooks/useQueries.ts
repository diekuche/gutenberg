import { useMemo } from "react";
import { useAccount } from "graz";
import { useContracts } from "./useContracts";
import { Denom } from "../ts/SwapPoolFactory.types";
import { useQueryCache } from "./useQueryCache";
import { InfoResponse } from "../ts/SwapPool.types";

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

export const useQueries = () => {
  const cache = useQueryCache();
  const contracts = useContracts();
  const { data: account } = useAccount();
  return useMemo(() => {
    if (!contracts) {
      return undefined;
    }
    const CW20_TOKEN_INFO = (tokenAddr: string) => {
      const token = contracts.Cw20ContractFactory(tokenAddr).querier;
      return cache.getOrUpdate(
        `/token/${tokenAddr}/info`,
        () => token.tokenInfo(),
      );
    };
    const CW20_TOKEN_MARKETING = (tokenAddr: string) => {
      const token = contracts.Cw20ContractFactory(tokenAddr).querier;
      return cache.getOrUpdate(
        `/token/${tokenAddr}/marketing`,
        () => token.marketingInfo(),
      );
    };
    const CW20_TOKEN_LOGO = (tokenAddr: string) => {
      const token = contracts.Cw20ContractFactory(tokenAddr).querier;
      return cache.getOrUpdate(`/token/${tokenAddr}/logo`, () => token.downloadLogo());
    };
    const CW20_TOKEN_DETAILS = async (tokenAddr: string): Promise<TokenDetails> => {
      const info = await CW20_TOKEN_INFO(tokenAddr);
      const marketing = await CW20_TOKEN_MARKETING(tokenAddr);
      const logo = marketing?.logo === "embedded" ? (await CW20_TOKEN_LOGO(tokenAddr)).data : marketing.logo?.url;
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
    };
    const SWAP_POOL_INFO = async (poolAddress: string): Promise<PoolInfo> => {
      const pool = contracts.PoolContractFactory(poolAddress).querier;
      return cache.getOrUpdate(`/pool/${poolAddress}/info`, () => pool.info());
    };
    const SWAP_POOL_LIST = async () => contracts.poolFactory.querier.getPools();
    const CW20_USER_BALANCE = async (
      tokenAddr: string,
      userAddress: string | undefined = account?.bech32Address,
    ) => {
      if (!userAddress) {
        throw new Error(
          `Not connected account when query CW20_USER_BALANCE for ${tokenAddr}`,
        );
      }
      const queryKey = `/user/${userAddress}/token/${tokenAddr}/balance`;
      return cache.getOrUpdate(
        queryKey,
        async () => {
          const token = contracts.Cw20ContractFactory(tokenAddr).querier;
          return (await token.balance({ address: userAddress })).balance;
        },
        {
          cacheTime: 5 * 60 * 1000, // 5 minutes
        },
      );
    };
    const CW20_USER_TOKEN_DETAILS = async (
      tokenAddress: string,
      userAddress?: string,
    ): Promise<UserTokenDetails> => {
      const userAddr = userAddress || account?.bech32Address;
      if (!userAddr) {
        throw new Error(
          `Not connected account when query CW20_USER_TOKEN_DETAILS for ${tokenAddress}`,
        );
      }
      const details = await CW20_TOKEN_DETAILS(tokenAddress);
      const balance = await CW20_USER_BALANCE(tokenAddress);

      return {
        balance,
        ...details,
      };
    };
    const USER_TOKEN_DETAILS = async (denom: Denom): Promise<UserTokenDetails> => {
      if ("native" in denom) {
        throw new Error("Native token still not implemented");
      }
      return CW20_USER_TOKEN_DETAILS(denom.cw20);
    };
    return {
      CW20_TOKEN_INFO,
      CW20_TOKEN_DETAILS,
      CW20_TOKEN_MARKETING,
      CW20_TOKEN_LOGO,
      SWAP_POOL_INFO,
      SWAP_POOL_LIST,
      CW20_USER_TOKEN_DETAILS,
      USER_TOKEN_DETAILS,
    };
  }, [contracts, cache]);
};
