import { Denom } from "generated/SwapPoolFactory.types";

export type PoolDenom = Denom;

export type TokenDetails = {
  denom: PoolDenom;
  type: "cw20" | "native";
  address?: string;
  decimals: number;
  name: string;
  symbol: string;
  logo?: string;
  minter: string;
};

export type UserTokenDetails = TokenDetails & {
  balance: string;
};
