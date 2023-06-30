import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useMemo } from "react";
import type { WalletContext } from "./useWalletContext";
import { useCosmWasmClient } from "./useCosmWasmClient";

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
  const cosmWasm = useCosmWasmClient();

  return useMemo(() => (!cosmWasm ? undefined
    : (contractAddress: string) => {
      const createExecutor = (
        { account, signingClients }: WalletContext,
      ) => new ContractClassExecute(
        signingClients.cosmWasm,
        account.bech32Address,
        contractAddress,
      );
      const querier = new ContractClassQuery(
        cosmWasm,
        contractAddress,
      );
      return {
        createExecutor,
        querier,
      };
    }), [cosmWasm]);
};

export type ContractFactory<Q, E> = {
  querier: Q,
  createExecutor: (context: WalletContext) => E;
};
