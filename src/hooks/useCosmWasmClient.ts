import { useClients } from "graz";
import { useChain } from "./useChain";

export const useCosmWasmClient = () => {
  const chain = useChain();
  const { data: clients } = useClients(chain);

  return clients?.cosmWasm;
};
