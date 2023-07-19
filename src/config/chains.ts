import { ChainInfo } from "@keplr-wallet/types";
import { mainnetChains } from "graz/chains";

export type ChainId = "juno-1" | "uni-6" | "bostrom" | "archway-1";

export type ChainConfig = Omit<ChainInfo, "chainId"> & {
  chainId: ChainId;
};

export const Chains: Record<ChainId, ChainConfig> = {
  "juno-1": { ...mainnetChains.juno, features: ["tokenfactory"] } as ChainConfig,
  "archway-1": { ...mainnetChains.archway } as ChainConfig,
  "uni-6": {
    chainId: "uni-6" as const,
    chainName: "Juno TestNet",
    stakeCurrency: {
      coinDenom: "ujunox",
      coinMinimalDenom: "ujunox",
      coinDecimals: 6,
    },
    rpc: "https://juno-testnet-rpc.polkachu.com:443/",
    rest: "https://juno-testnet-api.polkachu.com:443/",
    currencies: [{
      coinDenom: "ujunox",
      coinMinimalDenom: "ujunox",
      coinDecimals: 6,
    }],
    bip44: {
      coinType: 118,
    },
    // List of coin/tokens used as a fee token in this chain.
    feeCurrencies: [
      {
        coinDenom: "ujunox",
        coinMinimalDenom: "ujunox",
        coinDecimals: 6,
      },
    ],
    bech32Config: {
      bech32PrefixAccAddr: "juno",
      bech32PrefixAccPub: "junopub",
      bech32PrefixValAddr: "junovaloper",
      bech32PrefixValPub: "junovaloperpub",
      bech32PrefixConsAddr: "junovalcons",
      bech32PrefixConsPub: "junovalconspub",
    },
    features: ["stargate", "ibc-transfer", "tokenfactory"],
  },
  bostrom: {
    // Chain-id of the Cosmos SDK chain.
    chainId: "bostrom",
    // The name of the chain to be displayed to the user.
    chainName: "bostrom",
    // RPC endpoint of the chain.
    rpc: "https://rpc.bostrom.cybernode.ai",
    rest: "https://lcd.bostrom.cybernode.ai",
    stakeCurrency: {
      coinDenom: "boot",
      coinMinimalDenom: "boot",
      coinDecimals: 0,
    },
    bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "bostrom",
      bech32PrefixAccPub: "bostrompub",
      bech32PrefixValAddr: "bostromvaloper",
      bech32PrefixValPub: "bostromvaloperpub",
      bech32PrefixConsAddr: "bostromvalcons",
      bech32PrefixConsPub: "bostromvalconspub",
    },
    currencies: [
      {
        coinDenom: "boot",
        coinMinimalDenom: "boot",
        coinDecimals: 6,
        coinGeckoId: "bostrom",
        coinImageUrl: "https://raw.githubusercontent.com/cosmos/chain-registry/master/bostrom/images/boot.png",
      },
      {
        coinDenom: "H",
        coinMinimalDenom: "hydrogen",
        coinDecimals: 0,
      },
      {
        coinDenom: "V",
        coinMinimalDenom: "millivolt",
        coinDecimals: 3,
      },
      {
        coinDenom: "A",
        coinMinimalDenom: "milliampere",
        coinDecimals: 3,
      },
    ],
    // List of coin/tokens used as a fee token in this chain.
    feeCurrencies: [
      {
      // Coin denomination to be displayed to the user.
        coinDenom: "boot",
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: "boot",
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 6,
      },
    ],
    features: ["stargate", "ibc-transfer", "tokenfactory"],
  },
};
