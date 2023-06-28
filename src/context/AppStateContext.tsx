import { createContext, useContext } from "react";
import { Denom } from "../ts/SwapPoolFactory.types";

export type AppStatePool = {
  index: number;
  address: string;
  denom1: Denom;
  symbol1: string;
  denom2: Denom;
  symbol2: string;
};

export interface AppState {
  address: string;
  userTokens: string[];
  addUserToken: (address: string) => void;
  removeUserToken: (address: string) => void;
  setAddress: (address: string) => void;
  pools: AppStatePool[];
  setPools: (pools: AppStatePool[]) => void;
}

export const AppStateContext = createContext<AppState>({
  address: "",
  userTokens: [],
  addUserToken: () => {},
  removeUserToken: () => {},
  setAddress: () => {},
  pools: [],
  setPools: () => {},
});

export function useAppState() {
  return useContext(AppStateContext);
}
