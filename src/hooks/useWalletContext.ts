/* eslint-disable consistent-return */
import { useAccount, useSigningClients } from "graz";
import { useMemo } from "react";
import { Key } from "@keplr-wallet/types";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { SigningStargateClient } from "@cosmjs/stargate";
import { useContracts, type ContractsContext } from "./useContracts";

export const useWalletContext = () => {
  const { data: account } = useAccount();
  const { data: signingClients } = useSigningClients();
  const contracts = useContracts();
  return useMemo(() => {
    if (!account || !signingClients || !contracts) {
      return;
    }
    return {
      account,
      contracts,
      signingClients,
    };
  }, [account, signingClients, contracts]);
};

export type WalletContext = {
  account: Key;
  signingClients: {
    cosmWasm: SigningCosmWasmClient;
    stargate: SigningStargateClient;
  };
  contracts: ContractsContext
};
