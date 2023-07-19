import { ChainId } from "./chains";

export enum GasLimit {
  Cw20Instantiate,
  Cw20IncreaseAllowance,
  Cw20Send,
  Cw20Mint,
  Cw20Burn,
  PoolAddLiquidity,
  PoolFactoryCreatePool,
  NativeSendTokens,
}

export type ChainCosmwasmConfig = {
  factoryAddress: string;
  swapPoolContractCodeId: string;
  cw20ContractCodeId: number;
  gasLimits: Record<GasLimit, number>
};

const gasLimits = {
  [GasLimit.Cw20IncreaseAllowance]: 60000,
  [GasLimit.PoolAddLiquidity]: 60000,
  [GasLimit.PoolFactoryCreatePool]: 60000,
  [GasLimit.Cw20Instantiate]: 250000,
  [GasLimit.Cw20Send]: 150000,
  [GasLimit.NativeSendTokens]: 100000,
  [GasLimit.Cw20Mint]: 150000,
  [GasLimit.Cw20Burn]: 150000,
};

export const chainCosmwasmConfigs: Record<ChainId, ChainCosmwasmConfig> = {
  "uni-6": {
    factoryAddress: "juno1uya45lwhkavhnx00n8fteug9v9lrj6jv97fap5lvsgkrew2j7ydqlrf9f8",
    swapPoolContractCodeId: "2565",
    cw20ContractCodeId: 2571,
    gasLimits,
  },
  "juno-1": {
    factoryAddress: "juno1ppktvvht56q8dg3wzgxj5pfp90txu3v6c6sxp67c79ltqzuk9pkq0yhhaz",
    swapPoolContractCodeId: "2562",
    cw20ContractCodeId: 1,
    gasLimits,
  },
  bostrom: {
    factoryAddress: "bostrom1vtrwzjj5jdc6zsqjzmy8rl74qhlhp5svzrvk4r3syvv3hw9zk8sqcrash2",
    swapPoolContractCodeId: "23",
    cw20ContractCodeId: 1,
    gasLimits,
  },
  "archway-1": {
    cw20ContractCodeId: 21,
    gasLimits,
  },
};
