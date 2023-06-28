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
