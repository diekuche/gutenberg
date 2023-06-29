import { Denom } from "../ts/SwapPoolFactory.types";

export const compareDenoms = (denom1: Denom, denom2: Denom) => {
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

const countDecimals = (value: number) => {
  if (Math.floor(value.valueOf()) === value.valueOf()) return 0;
  return value.toString().split(".")[1].length || 0;
};

export const tokenAmountToFloat = (
  amount: string | number,
  decimal: number,
) => {
  const value = (Number(amount) / (10 ** decimal));

  return value.toFixed(
    Math.min(countDecimals(value), decimal),
  );
};

export const tokenFloatToAmount = (
  amount: string | number,
  decimal: number,
) => (Number(amount) * (10 ** decimal));

export const isDenomCw20 = (denom: Denom) => !("native" in denom);

export const isCw20 = (obj: Denom): obj is { cw20: string } => !("native" in obj);

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