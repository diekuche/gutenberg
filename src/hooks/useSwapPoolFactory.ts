import { SwapPoolFactoryClient, SwapPoolFactoryQueryClient } from "../ts/SwapPoolFactory.client";
import { useContract } from "./useContract";
import { ContractConfigs } from "../config/contracts";
import { useChain } from "./useChain";

export const useSwapPoolFactory = () => {
  const chain = useChain();
  return useContract(
    SwapPoolFactoryQueryClient,
    SwapPoolFactoryClient,
    ContractConfigs[chain.chainId].factoryAddress,
  );
};
