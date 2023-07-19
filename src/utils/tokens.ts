import { BigNumber } from "bignumber.js";
import type { Metadata } from "cosmjs-types/cosmos/bank/v1beta1/bank";
import { PoolDenom, TokenDetails } from "types/tokens";

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
export const getShortTokenName = (name: string) => (name.toLowerCase().startsWith("factory/") ? name.split("/")[2] : name);

export const nativeTokenDetails = (nativeToken: Metadata): TokenDetails => {
  const { denom } = nativeToken.denomUnits[0];
  const name = nativeToken.name || nativeToken.symbol || nativeToken.display || denom;
  const symbol = getShortTokenName(name);
  return {
    denom: { native: denom },
    type: "native",
    decimals: nativeToken.denomUnits[0].exponent,
    name,
    symbol,
    minter: "",
  };
};
