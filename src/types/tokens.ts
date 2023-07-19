import { Denom } from "generated/SwapPoolFactory.types";

export type PoolDenom = Denom;

export type TokenDetailsBase = {
  logo?: string;
  decimals: number;
};

export type Cw20TokenDetails = TokenDetailsBase & {
  type: "cw20";
  address: string;
  minter: string;
  name: string;
  symbol: string;
};

export type NativeTokenDetails = TokenDetailsBase & {
  type: "native";
  denom: string;
};

export type TokenDetails = Cw20TokenDetails | NativeTokenDetails;

export type UserTokenDetailsBase = {
  balance: string;
};

export type UserCw20TokenDetails = Cw20TokenDetails & UserTokenDetailsBase;
export type UserNativeTokenDetails = NativeTokenDetails & UserTokenDetailsBase;

export type UserTokenDetails = UserCw20TokenDetails | UserNativeTokenDetails;
