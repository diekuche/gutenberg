import { useActiveChain } from "graz";
import { SwapPoolFactoryClient, SwapPoolFactoryQueryClient } from "../ts/SwapPoolFactory.client";
import { useContract } from "./useContract";
import { ContractConfigs } from "../config/contracts";

export const useSwapPoolFactory = () => {
  const activeChain = useActiveChain();
  return useContract(
    SwapPoolFactoryQueryClient,
    SwapPoolFactoryClient,
    ContractConfigs[activeChain?.chainId || "bostrom"].factoryAddress,
  );
};
