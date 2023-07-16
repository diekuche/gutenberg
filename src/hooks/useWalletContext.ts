/* eslint-disable consistent-return */
import { useAccount, useClients, useSigningClients } from "graz";
import { useMemo } from "react";
import { Key } from "@keplr-wallet/types";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { useContracts, type ContractsContext } from "./useContracts";

export const useWalletContext = () => {
  const { data: account } = useAccount();
  const { data: signingClients } = useSigningClients();
  const { data: clients } = useClients();
  const contracts = useContracts();
  return useMemo(() => {
    if (!account || !signingClients || !contracts || !clients) {
      return;
    }
    return {
      account,
      contracts,
      signingClients,
      clients,
    };
  }, [account, signingClients, contracts]);
};

export type WalletContext = {
  account: Key;
  signingClients: {
    cosmWasm: SigningCosmWasmClient;
    stargate: SigningStargateClient;
  };
  clients: {
    stargate: StargateClient;
  };
  contracts: ContractsContext
};
