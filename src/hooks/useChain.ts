import { createContext, useContext } from "react";
import { Chain } from "classes/Chain";

export const ChainContext = createContext<Chain | null>(null);

export const useChain = () => {
  const chain = useContext(ChainContext);
  if (!chain) {
    throw new Error("Not found provided ChainContext");
  }
  return chain;
};
