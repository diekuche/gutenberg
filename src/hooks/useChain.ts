import { useContext, useMemo } from "react";
import { Chain } from "classes/Chain";
import { Chains } from "../config/chains";
import { AppContext } from "../context/AppContext";

export const useChain = () => {
  const { chainId } = useContext(AppContext);
  return useMemo(() => new Chain(Chains[chainId]), [chainId]);
};
