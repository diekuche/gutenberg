/* eslint-disable consistent-return */
import { useMemo } from "react";
import { Coin } from "@cosmjs/amino";
import { isCw20, isNative } from "../utils/tokens";
import { useFee } from "../utils/useFee";
import { useContracts } from "./useContracts";
import { TokenDetails, USER_TOKEN_DETAILS, useQueries } from "./useQueries";
import { useWalletContext } from "./useWalletContext";

export const useAddLiquidity = () => {
  const fee = useFee();
  const contracts = useContracts();
  const queries = useQueries();
  const walletContext = useWalletContext();

  
  return {
    addLiquidity,
  };
};
