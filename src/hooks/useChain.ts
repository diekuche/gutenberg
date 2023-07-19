import { useContext, useMemo } from "react";
import { Chain } from "classes/Chain";
import { Chains } from "../config/chains";
import { AppStateContext } from "../context/AppStateContext";

export const useChain = () => {
  const { chainId } = useContext(AppStateContext);
  return useMemo(() => new Chain(Chains[chainId]), [chainId]);
};
