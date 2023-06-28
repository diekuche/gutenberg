import { useActiveChain } from "graz";
import { useMemo } from "react";

export const useChain = () => {
  const activeChain = useActiveChain();
  const chainId = activeChain?.chainId || "bostrom";
  return useMemo(() => ({
    chainId,
    name: chainId.startsWith("uni") ? "Juno" : "Bostrom",
  }), [chainId]);
};
