import { PoolDenom } from "./tokens";

export type PoolDetails = {
  index: number;
  address: string;
  denom1: PoolDenom;
  symbol1: string;
  denom2: PoolDenom;
  symbol2: string;
};
