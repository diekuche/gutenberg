import { ChainInfo } from "@keplr-wallet/types";
import { juno } from "./chains/juno";
import osmoTest from "./chains/osmo-test";
import JunoTest from "./chains/juno-test";
import Bostrom from "./chains/bostrom";
import { DesmosMainnet } from "./chains/desmos";
import { NeutronMainnet } from "./chains/neutron";
import { ArchwayMainnet } from "./chains/archway";

export type ChainId = "juno-1" | "uni-6" | "bostrom" | "osmo-test-5" | "desmos-mainnet" | "neutron-1" | "archway-1";

export type ChainConfig = Omit<ChainInfo, "chainId"> & {
  chainId: ChainId;
  isTestNet?: boolean;
};

export const Chains: Record<ChainId, ChainConfig> = {
  "osmo-test-5": {
    ...osmoTest,
    features: [...osmoTest.features, "tokenfactory"],
    isTestNet: true,
  } as ChainConfig,
  "juno-1": { ...juno, features: ["tokenfactory"] } as ChainConfig,
  "archway-1": { ...ArchwayMainnet } as ChainConfig,
  "uni-6": {
    ...JunoTest,
    chainId: "uni-6",
    isTestNet: true,
  },
  bostrom: {
    ...Bostrom,
    chainId: "bostrom",
  },
  "desmos-mainnet": {
    ...DesmosMainnet,
    chainId: "desmos-mainnet",
    features: ["cosmwasm"],
  },
  "neutron-1": {
    ...NeutronMainnet,
    chainId: "neutron-1",
    features: [],
  },
};
