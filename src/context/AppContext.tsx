import { createContext, useContext } from "react";
import { ChainId } from "config/chains";

export interface AppState {
  chainId: ChainId,
  setChainId: (chainId: ChainId) => void,
}

export const AppContext = createContext<AppState>({
  chainId: "bostrom",
  setChainId: () => {},
});

export function useAppState() {
  return useContext(AppContext);
}
