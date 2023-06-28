import { useMemo } from "react";
import { useAccount } from "graz";
import { useContracts } from "./useContracts";
import { Denom } from "../ts/SwapPoolFactory.types";
import { usePersistantQueryClient } from "./usePersistentQueryClient";

export type TokenDetails = {
  denom: Denom;
  type: "c20" | "tokenfactory" | "native";
  address: string;
  decimals: number;
  name: string;
  symbol: string;
  logo?: string;
};

export type UserTokenDetails = TokenDetails & {
  balance: string;
};

export const useQueries = () => {
  const queryClient = usePersistantQueryClient();
  const contracts = useContracts();
  const { data: account } = useAccount();
  return useMemo(() => {
    if (!contracts || !queryClient) {
      return undefined;
    }
    const CW20_TOKEN_INFO = (tokenAddr: string) => {
      const token = contracts.Cw20ContractFactory(tokenAddr).querier;
      return queryClient.fetchQuery({
        queryKey: [`/token/${tokenAddr}/info`],
        queryFn: () => token.tokenInfo(),
      });
    };
    const CW20_TOKEN_MARKETING = (tokenAddr: string) => {
      const token = contracts.Cw20ContractFactory(tokenAddr).querier;
      return queryClient.fetchQuery({
        queryKey: [`/token/${tokenAddr}/marketing`],
        queryFn: () => token.marketingInfo(),
      });
    };
    const CW20_TOKEN_LOGO = (tokenAddr: string) => {
      const token = contracts.Cw20ContractFactory(tokenAddr).querier;
      return queryClient.fetchQuery({
        queryKey: [`/token/${tokenAddr}/logo`],
        queryFn: () => token.downloadLogo(),
      });
    };
    const CW20_TOKEN_DETAILS = async (tokenAddr: string): Promise<TokenDetails> => {
      const info = await CW20_TOKEN_INFO(tokenAddr);
      const marketing = await CW20_TOKEN_MARKETING(tokenAddr);
      const logo = marketing?.logo === "embedded" ? (await CW20_TOKEN_LOGO(tokenAddr)).data : marketing.logo?.url;
      return {
        type: "c20",
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
    const SWAP_POOL_INFO = async (poolAddress: string) => {
      const pool = contracts.PoolContractFactory(poolAddress).querier;
      return queryClient.fetchQuery({
        queryKey: [`/pool/${poolAddress}/info`],
        queryFn: () => pool.info(),
      });
    };
    const SWAP_POOL_LIST = async () => contracts.poolFactory.querier.getPools();
    const CW20_USER_BALANCE = async (tokenAddr: string, userAddress?: string) => {
      const userAddr = userAddress || account?.bech32Address;
      if (!userAddr) {
        throw new Error(
          `Not connected account when query CW20_USER_BALANCE for ${tokenAddr}`,
        );
      }
      const token = contracts.Cw20ContractFactory(tokenAddr).querier;
      return (await token.balance({ address: userAddr })).balance;
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
  }, [contracts, queryClient]);
};
