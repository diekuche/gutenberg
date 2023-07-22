import { BigNumber } from "bignumber.js";
import type { Metadata } from "cosmjs-types/cosmos/bank/v1beta1/bank";
import { NativeTokenDetails, PoolDenom, TokenDetails } from "types/tokens";

export const comparePoolDenoms = (denom1: PoolDenom, denom2: PoolDenom) => {
  const isDenom1Native = "native" in denom1;
  const isDenom2Native = "native" in denom2;
  if (isDenom1Native && isDenom2Native) {
    return denom1.native === denom2.native;
  }
  if (!isDenom1Native && !isDenom2Native) {
    return denom1.cw20 === denom2.cw20;
  }
  return false;
};

export const compareTokens = (
  token1: TokenDetails,
  token2: TokenDetails,
) => (
  token1.type === "cw20" && token2.type === "cw20"
    && token1.address === token2.address
) || (
  token1.type === "native" && token2.type === "native"
    && token1.denom === token2.denom
);

export const tokenAmountToFloat = (
  amount: string | number,
  decimal: number,
) => {
  const value = BigNumber(amount).dividedBy(BigNumber(10 ** decimal)).dp(decimal);
  return value.toFixed();
};

export const tokenFloatToAmount = (
  amount: string | number,
  decimal: number,
) => (Number(amount) * (10 ** decimal));

export const isDenomCw20 = (denom: PoolDenom) => !("native" in denom);

export const isCw20 = (obj: PoolDenom): obj is { cw20: string } => !("native" in obj);
export const isNative = (obj: PoolDenom): obj is { native: string } => ("native" in obj);

export const calcTokenExchangePrice = (
  amount1: string,
  amount2: string,
  fee: number,
) => {
  const input = Number(1);
  const inputReserve = Number(amount1);
  const outputReserve = Number(amount2);
  const inputWithFee = (1 - (fee / 100)) * input;
  return ((inputWithFee * outputReserve) / (inputReserve + inputWithFee));
};
export const getShortTokenName = (token: TokenDetails) => {
  if (token.type === "native") {
    const name = token.denom;
    return (name.toLowerCase().startsWith("factory/") ? name.split("/")[2] : name);
  }
  return token.symbol;
};

export const denomMetaDataToTokenDetails = (metadata: Metadata): NativeTokenDetails => {
  const { denom } = metadata.denomUnits[0];
  return {
    denom,
    type: "native",
    decimals: metadata.denomUnits[0].exponent,
  };
};

export const tokenToPoolDenom = (token: TokenDetails): PoolDenom => (token.type === "cw20" ? {
  cw20: token.address,
} : {
  native: token.denom,
});

export const searchInToken = (token: TokenDetails, q: string) => {
  if (token.type === "native") {
    return token.denom.toLowerCase().includes(q.toLowerCase());
  }
  return token.name.toLowerCase().includes(q.toLowerCase())
  || token.symbol.toLowerCase().includes(q.toLowerCase());
};
