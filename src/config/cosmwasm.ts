import { ChainId } from "./chains";

export enum GasLimit {
  Cw20Instantiate,
  Cw20IncreaseAllowance,
  Cw20Send,
  Cw20Mint,
  Cw20Burn,
  PoolAddLiquidity,
  PoolRemoveLiquidity,
  PoolFactoryCreatePool,
  NativeSendTokens,
  TokenFactoryCreateDenom,
  TokenFactoryMint,
  TokenFactoryBurn,
}

export type ChainCosmwasmConfig = {
  factoryAddress: string;
  swapPoolContractCodeId: string;
  cw20ContractCodeId: number;
  gasLimits: Record<GasLimit, number>
};

const gasLimits = {
  [GasLimit.Cw20IncreaseAllowance]: 160000,
  [GasLimit.PoolAddLiquidity]: 500000,
  [GasLimit.PoolRemoveLiquidity]: 500000,
  [GasLimit.PoolFactoryCreatePool]: 600000,
  [GasLimit.Cw20Instantiate]: 250000,
  [GasLimit.Cw20Send]: 150000,
  [GasLimit.NativeSendTokens]: 100000,
  [GasLimit.Cw20Mint]: 150000,
  [GasLimit.Cw20Burn]: 150000,
  [GasLimit.TokenFactoryCreateDenom]: 3048994,
  [GasLimit.TokenFactoryMint]: 3048994,
  [GasLimit.TokenFactoryBurn]: 3048994,
};

export const chainCosmwasmConfigs: Record<ChainId, ChainCosmwasmConfig> = {
  "uni-6": {
    factoryAddress: "juno1uya45lwhkavhnx00n8fteug9v9lrj6jv97fap5lvsgkrew2j7ydqlrf9f8",
    swapPoolContractCodeId: "2565",
    cw20ContractCodeId: 2571,
    gasLimits,
  },
  "juno-1": {
    factoryAddress: "juno1q4x5lurm69ta2xu8wj7hwhqn0fhygapllv37a9q247607ezrt4kshp94qy",
    swapPoolContractCodeId: "3360",
    cw20ContractCodeId: 1,
    gasLimits,
  },
  bostrom: {
    factoryAddress: "bostrom1wlexzeqnd8dqvrhw0x0vlh3xqxr88ak88zztrx87sehfekje4ajqx3wnfx",
    swapPoolContractCodeId: "30",
    cw20ContractCodeId: 1,
    gasLimits,
  },
  // "archway-1": {
  //   cw20ContractCodeId: 21,
  //   gasLimits,
  // },
  "osmo-test-5": {
    factoryAddress: "osmo1h4a3wk756pwy6ank2dmeaqpz50tjx8jcvzp3r3499q2tj6yqtjqqucjf7s",
    cw20ContractCodeId: 2265,
    swapPoolContractCodeId: "2263",
    gasLimits,
  },
};
