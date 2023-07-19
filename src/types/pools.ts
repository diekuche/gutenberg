import { TokenDetails } from "./tokens";

export type PoolDetails = {
  index: number;
  address: string;
  token1: TokenDetails;
  token2: TokenDetails
};
