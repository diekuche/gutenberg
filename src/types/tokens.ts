import { Denom } from "../ts/SwapPoolFactory.types";

export type TokenDetails = {
  denom: Denom;
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
