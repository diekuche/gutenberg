import { createContext, useContext } from "react";

interface AppState {
  address: string;
  userTokens: string[];
  addUserToken: (address: string) => void;
  removeUserToken: (address: string) => void;
  setAddress: (address: string) => void;
}

export const AppStateContext = createContext<AppState>({
  address: "",
  userTokens: [],
  addUserToken: () => {},
  removeUserToken: () => {},
  setAddress: () => {},
});

export function useAppState() {
  return useContext(AppStateContext);
}
