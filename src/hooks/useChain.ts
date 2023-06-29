import { useActiveChain } from "graz";
import { useMemo } from "react";
import { ChainId, Chains } from "../config/chains";

export const useChain = () => {
  const activeChain = useActiveChain();
  const chainId = (activeChain?.chainId || "bostrom") as ChainId;
  return useMemo(() => Chains[chainId], [chainId]);
};
