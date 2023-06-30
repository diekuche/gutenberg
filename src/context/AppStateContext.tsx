import { createContext, useContext } from "react";
import { Denom } from "../ts/SwapPoolFactory.types";
import { ChainId } from "../config/chains";

export type AppStatePool = {
  index: number;
  address: string;
  denom1: Denom;
  symbol1: string;
  denom2: Denom;
  symbol2: string;
};

export interface AppState {
  chainId: ChainId,
  setChainId: (chainId: ChainId) => void,
  address: string;
  userTokens: string[];
  addUserToken: (address: string) => void;
  removeUserToken: (address: string) => void;
  setAddress: (address: string) => void;
}

export const AppStateContext = createContext<AppState>({
  chainId: "bostrom",
  setChainId: () => {},
  address: "",
  userTokens: [],
  addUserToken: () => {},
  removeUserToken: () => {},
  setAddress: () => {},
});

export function useAppState() {
  return useContext(AppStateContext);
}
