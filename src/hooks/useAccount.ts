import {
  createContext, useContext,
} from "react";
import { Account } from "classes/Account";

export const AccountContext = createContext<{
  account?: Account;
  isConnecting: boolean;
  isConnected: boolean;
  connectError: unknown;
  connect:() => void;
  disconnect: () => void;
} | null>(null);

export const useAccount = () => {
  const accountContext = useContext(AccountContext);
  if (!accountContext) {
    throw new Error("Not found provided AccountContext");
  }
  return accountContext;
};
