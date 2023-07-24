import { createContext, useContext } from "react";
import { Wallet } from "classes/Wallet";

export const WalletContext = createContext(new Wallet());
export const useWallet = () => useContext(WalletContext);
