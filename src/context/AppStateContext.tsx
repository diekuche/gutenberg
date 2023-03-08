import { createContext, useContext } from "react";

interface AppState {
  address: string;
  setAddress: (address: string) => void;
}

export const AppStateContext = createContext<AppState>({
  address: "",
  setAddress: () => {},
});

export function useAppState() {
  return useContext(AppStateContext);
}
