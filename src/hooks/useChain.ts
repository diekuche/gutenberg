import { useContext, useMemo } from "react";
import { Chains } from "../config/chains";
import { AppStateContext } from "../context/AppStateContext";

export const useChain = () => {
  const { chainId } = useContext(AppStateContext);
  return useMemo(() => Chains[chainId], [chainId]);
};
