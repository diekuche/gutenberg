import { SwapPoolClient, SwapPoolQueryClient } from "../ts/SwapPool.client";
import { useContract } from "./useContract";
import { useContractFactory } from "./useContractFactory";

export const useSwapPool = (
  contractAddress: string,
) => useContract(SwapPoolQueryClient, SwapPoolClient, contractAddress);

export const useSwapPoolContractFactory = () => useContractFactory(
  SwapPoolQueryClient,
  SwapPoolClient,
);
