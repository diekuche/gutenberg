import BigNumber from "bignumber.js";
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
  symbol: string;
  denom: string;
  minimalDenom?: string;
};

export type TokenDetails = Cw20TokenDetails | NativeTokenDetails;

export type UserTokenDetailsBase = {
  balance: string;
};

export type UserCw20TokenDetails = Cw20TokenDetails & UserTokenDetailsBase;
export type UserNativeTokenDetails = NativeTokenDetails & UserTokenDetailsBase;

export type UserTokenDetails = UserCw20TokenDetails | UserNativeTokenDetails;

export type TokenListItem = {
  id: string;
  key: string;
  logoUrl: string;
  shortName: string;
  userBalance: BigNumber;
  isSendable: boolean;
  isBurnable: boolean;
  isMintable: boolean;
  isRemovable: boolean;
};

export type TokenItem = UserTokenDetails & {
  id: string;
  updatedAt: number;
};
