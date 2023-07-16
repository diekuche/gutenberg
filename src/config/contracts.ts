import { ChainId } from "./chains";

export type NetworkContractConfig = {
  factoryAddress: string;
  swapPoolContractCodeId: string;
  cw20ContractCodeId: number;
};

export const ContractConfigs: Record<ChainId, NetworkContractConfig> = {
  "uni-6": {
    factoryAddress: "juno1uya45lwhkavhnx00n8fteug9v9lrj6jv97fap5lvsgkrew2j7ydqlrf9f8",
    swapPoolContractCodeId: "2565",
    cw20ContractCodeId: 2571,
  },
  "juno-1": {
    factoryAddress: "juno1ppktvvht56q8dg3wzgxj5pfp90txu3v6c6sxp67c79ltqzuk9pkq0yhhaz",
    swapPoolContractCodeId: "2562",
    cw20ContractCodeId: 1,
  },
  bostrom: {
    factoryAddress: "bostrom1vtrwzjj5jdc6zsqjzmy8rl74qhlhp5svzrvk4r3syvv3hw9zk8sqcrash2",
    swapPoolContractCodeId: "23",
    cw20ContractCodeId: 1,
  },
  "archway-1": {
    cw20ContractCodeId: 21,
  },
};
