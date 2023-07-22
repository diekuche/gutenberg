import { ChainInfo } from "@keplr-wallet/types";
import { juno } from "./chains/juno";
import osmoTest from "./chains/osmo-test";
import JunoTest from "./chains/juno-test";
import Bostrom from "./chains/bostrom";

export type ChainId = "juno-1" | "uni-6" | "bostrom" | "osmo-test-5";

export type ChainConfig = Omit<ChainInfo, "chainId"> & {
  chainId: ChainId;
  isTestNet?: boolean;
};

export const Chains: Record<ChainId, ChainConfig> = {
  "osmo-test-5": {
    ...osmoTest,
    features: ["tokenfactory"],
    isTestNet: true,
  } as ChainConfig,
  "juno-1": { ...juno, features: ["tokenfactory"] } as ChainConfig,
  // "archway-1": { ...mainnetChains.archway } as ChainConfig,
  "uni-6": {
    ...JunoTest,
    chainId: "uni-6",
    isTestNet: true,
  },
  bostrom: {
    ...Bostrom,
    chainId: "bostrom",
  },
};
