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

export const tokenAmountToFloat = (
  amount: string,
  decimal: number,
  precision = 2,
) => (Number(amount) / (10 ** decimal)).toFixed(precision);

export const tokenFloatToAmount = (
  amount: string,
  decimal: number,
) => (Number(amount) * (10 ** decimal));

export const isDenomCw20 = (denom: Denom) => !("native" in denom);

export const isCw20 = (obj: Denom): obj is { cw20: string } => !("native" in obj);
