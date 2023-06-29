import { ChainId } from "./chains";

export type NetworkContractConfig = {
  factoryAddress: string;
  swapPoolContractCodeId: string;
};

export const ContractConfigs: Record<ChainId, NetworkContractConfig> = {
  "uni-6": {
    factoryAddress: "juno1ppktvvht56q8dg3wzgxj5pfp90txu3v6c6sxp67c79ltqzuk9pkq0yhhaz",
    swapPoolContractCodeId: "2562",
  },
  "juno-1": {
    factoryAddress: "juno1ppktvvht56q8dg3wzgxj5pfp90txu3v6c6sxp67c79ltqzuk9pkq0yhhaz",
    swapPoolContractCodeId: "2562",
  },
  bostrom: {
    factoryAddress: "bostrom15fercyxhn09ypjyskva53q82s7ghsds57lnv9lsjtexhnt05wkrqga7407",
    swapPoolContractCodeId: "23",
  },
};
