import { ChainId } from "../config/chains";
import { ContractConfigs } from "../config/contracts";
import { useChain } from "./useChain";

export const useContractConfig = () => {
  const chain = useChain();
  return ContractConfigs[chain.chainId as ChainId];
};
