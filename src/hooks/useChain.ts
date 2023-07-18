import { useContext, useMemo } from "react";
import { useActiveChain } from "graz";
import { Chain } from "classes/Chain";
import { ChainId, Chains } from "../config/chains";
import { AppStateContext } from "../context/AppStateContext";

export const useChain = () => {
  const { chainId, setChainId } = useContext(AppStateContext);
  const activeChain = useActiveChain();
  return useMemo(() => {
    let realChainId = chainId;
    if (activeChain && activeChain.chainId !== chainId) {
      realChainId = activeChain.chainId as ChainId;
      setChainId(realChainId);
    }
    return new Chain(Chains[realChainId]);
  }, [chainId, activeChain]);
};
