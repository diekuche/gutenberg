import { Cw20Client, Cw20QueryClient } from "../ts/Cw20.client";
import { useContract } from "./useContract";
import { useContractFactory } from "./useContractFactory";

export const useCw20 = (
  contractAddress: string,
) => useContract(Cw20QueryClient, Cw20Client, contractAddress);

export const useCw20ContractFactory = () => useContractFactory(
  Cw20QueryClient,
  Cw20Client,
);
