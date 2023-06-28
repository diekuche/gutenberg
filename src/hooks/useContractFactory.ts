import {
  useAccount, useClients, useSigningClients,
} from "graz";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useMemo } from "react";

export const useContractFactory = <Q, E>(
  ContractClassQuery: new (
    cosmWasm: CosmWasmClient,
    address: string,
  ) => Q,
  ContractClassExecute: new (
    cosmWasm: SigningCosmWasmClient,
    sender: string,
    address: string,
  ) => E,
) => {
  const { data: cosmClients } = useClients();
  const { data: cosmSigningClients } = useSigningClients();
  const { data: account } = useAccount();
  return useMemo(() => (!cosmClients || !account || !cosmSigningClients
    ? undefined
    : (contractAddress: string) => {
      const executor = new ContractClassExecute(
        cosmSigningClients.cosmWasm,
        account.bech32Address,
        contractAddress,
      );
      const querier = new ContractClassQuery(
        cosmClients.cosmWasm,
        contractAddress,
      );
      return {
        executor,
        querier,
      };
    }), [cosmClients, account, cosmSigningClients]);
};
