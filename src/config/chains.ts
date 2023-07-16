import { ChainInfo } from "@keplr-wallet/types";
import { mainnetChains } from "graz/chains";

const CYBER = {
  CYBER_CONGRESS_ADDRESS: "cyber1latzme6xf6s8tsrymuu6laf2ks2humqvdq39v8",
  DIVISOR_CYBER_G: 10 ** 9,
  DENOM_CYBER: "boot",
  DENOM_CYBER_G: "GBOOT",
  HYDROGEN: "H",

  // CHAIN_ID: 'dev',
  // CYBER_NODE_URL_API: 'http://localhost:26657',
  // CYBER_WEBSOCKET_URL: 'ws://localhost:26657/websocket',
  // CYBER_NODE_URL_LCD: 'http://localhost:1317',

  CHAIN_ID: "bostrom" as const,
  CYBER_NODE_URL_API: "https://rpc.bostrom.cybernode.ai",
  CYBER_WEBSOCKET_URL: "wss://rpc.bostrom.cybernode.ai/websocket",
  CYBER_NODE_URL_LCD: "https://lcd.bostrom.cybernode.ai",
  CYBER_INDEX_HTTPS: "https://index.bostrom.cybernode.ai/v1/graphql",
  CYBER_INDEX_WEBSOCKET: "wss://index.bostrom.cybernode.ai/v1/graphql",

  // CHAIN_ID: 'space-pussy-1',
  // CYBER_NODE_URL_API: 'https://rpc.space-pussy-1.cybernode.ai',
  // CYBER_WEBSOCKET_URL: 'wss://rpc.space-pussy-1.cybernode.ai/websocket',
  // CYBER_NODE_URL_LCD: 'https://lcd.space-pussy-1.cybernode.ai',
  // CYBER_INDEX_HTTPS: 'https://index.space-pussy-1.cybernode.ai/v1/graphql',
  // CYBER_INDEX_WEBSOCKET: 'wss://index.space-pussy-1.cybernode.ai/v1/graphql',

  CYBER_GATEWAY: "https://gateway.ipfs.cybernode.ai",

  BECH32_PREFIX_ACC_ADDR_CYBER: "bostrom",
  BECH32_PREFIX_ACC_ADDR_CYBERVALOPER: "bostromvaloper",
  MEMO_KEPLR: "[bostrom] cyb.ai, using keplr",
};

export type ChainId = "juno-1" | "uni-6" | "bostrom" | "archway-1";

export type ChainConfig = Omit<ChainInfo, "chainId"> & {
  chainId: ChainId
};

export const Chains: Record<ChainId, ChainConfig> = {
  "juno-1": mainnetChains.juno as ChainConfig,
  "archway-1": mainnetChains.archway as ChainConfig,
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
    features: ["stargate", "ibc-transfer"],
  },
  bostrom: {
    // Chain-id of the Cosmos SDK chain.
    chainId: CYBER.CHAIN_ID,
    // The name of the chain to be displayed to the user.
    chainName: CYBER.CHAIN_ID,
    // RPC endpoint of the chain.
    rpc: CYBER.CYBER_NODE_URL_API,
    rest: CYBER.CYBER_NODE_URL_LCD,
    stakeCurrency: {
      coinDenom: CYBER.DENOM_CYBER.toUpperCase(),
      coinMinimalDenom: CYBER.DENOM_CYBER,
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
        coinDenom: CYBER.DENOM_CYBER.toUpperCase(),
        coinMinimalDenom: CYBER.DENOM_CYBER,
        coinDecimals: 6,
        coinGeckoId: CYBER.CHAIN_ID,
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
        coinDenom: CYBER.DENOM_CYBER.toUpperCase(),
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: CYBER.DENOM_CYBER,
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 0,
      },
    ],
    features: ["stargate", "ibc-transfer"],
  },
};
