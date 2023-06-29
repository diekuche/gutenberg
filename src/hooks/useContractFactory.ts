import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { WalletContext } from "./useWalletContext";
import { useChain } from "./useChain";

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
  const chain = useChain();
  const cosmWasm = useRef<CosmWasmClient | null>(null);

  useEffect(() => {
    CosmWasmClient.connect(chain.rpc).then((client) => {
      cosmWasm.current = client;
    }).catch((e) => {
      console.log(`Unable connect to ${chain.rest}`);
      console.log(e);
      toast.error(`Unable connect to ${chain.rest}`);
    });
  }, []);

  return useMemo(() => {
    const client = cosmWasm.current;

    return !client ? undefined
      : (contractAddress: string) => {
        const createExecutor = (
          { account, signingClients }: WalletContext,
        ) => new ContractClassExecute(
          signingClients.cosmWasm,
          account.bech32Address,
          contractAddress,
        );
        const querier = new ContractClassQuery(
          client,
          contractAddress,
        );
        return {
          createExecutor,
          querier,
        };
      };
  }, [cosmWasm.current]);
};
