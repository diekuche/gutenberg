import { Chain } from "classes/Chain";
import { Cw20QueryClient } from "generated/Cw20.client";
import { SwapPoolQueryClient } from "generated/SwapPool.client";
import {
  Cw20TokenDetails, UserCw20TokenDetails,
} from "types/tokens";

export const CW20_TOKEN_MARKETING = (tokenAddr: string) => ({
  queryKey: `/token/${tokenAddr}/marketing`,
  queryFn: async ({ chain }: {
    chain: Chain
  }) => {
    const token = new Cw20QueryClient(await chain.getCosmWasmClient(), tokenAddr);
    return token.marketingInfo();
  },
});

export const CW20_TOKEN_MINTER = (tokenAddr: string) => ({
  queryKey: `/token/${tokenAddr}/minter`,
  queryFn: async ({ chain }: {
    chain: Chain
  }) => {
    const token = new Cw20QueryClient(await chain.getCosmWasmClient(), tokenAddr);
    return token.minter();
  },
});

export const CW20_TOKEN_INFO = (tokenAddr: string) => ({
  queryKey: `/token/${tokenAddr}/info`,
  queryFn: async ({ chain }: {
    chain: Chain
  }) => {
    const token = new Cw20QueryClient(await chain.getCosmWasmClient(), tokenAddr);
    return token.tokenInfo();
  },
});

export const CW20_TOKEN_LOGO = (tokenAddr: string) => ({
  queryKey: `/token/${tokenAddr}/logo`,
  queryFn: async ({ chain }: {
    chain: Chain
  }) => {
    const token = new Cw20QueryClient(await chain.getCosmWasmClient(), tokenAddr);
    return token.downloadLogo();
  },
});

export const CW20_TOKEN_DETAILS = (tokenAddr: string) => ({
  queryKey: `/v0.1/cw20/${tokenAddr}/details`,
  queryFn: async (context: {
    chain: Chain
  }): Promise<Cw20TokenDetails> => {
    const { chain } = context;
    const info = await chain.query(CW20_TOKEN_INFO(tokenAddr));
    const marketing = await chain.query(CW20_TOKEN_MARKETING(tokenAddr));
    const minter = await chain.query(CW20_TOKEN_MINTER(tokenAddr));

    const logo = marketing?.logo === "embedded"
      ? (await chain.query(CW20_TOKEN_LOGO(tokenAddr))).data
      : marketing.logo?.url;
    const gDriveId = logo?.match(/d\/(.+)\//)?.[1];
    return {
      type: "cw20",
      address: tokenAddr,
      name: info.name,
      decimals: info.decimals,
      symbol: info.symbol,
      logo: gDriveId ? `https://drive.google.com/uc?id=${gDriveId}` : logo,
      minter: minter.minter,
    };
  },
});

export const CW20_USER_BALANCE = (
  tokenAddr: string,
  userAddress: string,
) => ({
  queryKey: `/user/${userAddress}/token/${tokenAddr}/balance`,
  queryFn: async ({ chain }: {
    chain: Chain
  }) => {
    const token = new Cw20QueryClient(await chain.getCosmWasmClient(), tokenAddr);
    return (await token.balance({ address: userAddress })).balance;
  },
  cacheTime: 5 * 60 * 1000,
});

export const CW20_USER_TOKEN_DETAILS = (
  tokenAddress: string,
  userAddress: string,
) => ({
  queryKey: `/v0.1/user/${userAddress}/cw20/${tokenAddress}/details`,
  queryFn: async (context: {
    chain: Chain
  }): Promise<UserCw20TokenDetails> => {
    const { chain } = context;
    const details = await chain.query(CW20_TOKEN_DETAILS(tokenAddress));
    const balance = await chain.query(CW20_USER_BALANCE(tokenAddress, userAddress));
    return {
      balance,
      ...details,
    };
  },
  cacheTime: 1,
});

export const POOL_TOKEN1_FOR_TOKEN2_PRICE = (poolAddress: string, token1Amount: string) => ({
  queryKey: `/pool/${poolAddress}/token1ForToken2Price`,
  queryFn: async ({ chain }: { chain: Chain }) => {
    const pool = new SwapPoolQueryClient(await chain.getCosmWasmClient(), poolAddress);
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
