import { useEffect, useState } from "react";
import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useContractFactory } from "./useContractFactory";

export const useContract = <Q, E>(
  ContractClassQuery: new (
    cosmWasm: CosmWasmClient,
    address: string,
  ) => Q,
  ContractClassExecute: new (
    cosmWasm: SigningCosmWasmClient,
    sender: string,
    address: string,
  ) => E,
  contractAddress: string,
) => {
  const factory = useContractFactory(ContractClassQuery, ContractClassExecute);
  const [clients, setClients] = useState<{
    executor: E,
    querier: Q,
  } | undefined>();
  useEffect(() => {
    if (!factory) {
      return;
    }
    setClients(factory(contractAddress));
  }, [factory, contractAddress]);

  return clients;
};
