import { defineChains, connect } from "graz";

const CYBER = {
    CYBER_CONGRESS_ADDRESS: 'cyber1latzme6xf6s8tsrymuu6laf2ks2humqvdq39v8',
    DIVISOR_CYBER_G: 10 ** 9,
    DENOM_CYBER: 'boot',
    DENOM_CYBER_G: `GBOOT`,
    HYDROGEN: 'H',
  
    // CHAIN_ID: 'dev',
    // CYBER_NODE_URL_API: 'http://localhost:26657',
    // CYBER_WEBSOCKET_URL: 'ws://localhost:26657/websocket',
    // CYBER_NODE_URL_LCD: 'http://localhost:1317',
  
    CHAIN_ID: 'bostrom',
    CYBER_NODE_URL_API: 'https://rpc.bostrom.cybernode.ai',
    CYBER_WEBSOCKET_URL: 'wss://rpc.bostrom.cybernode.ai/websocket',
    CYBER_NODE_URL_LCD: 'https://lcd.bostrom.cybernode.ai',
    CYBER_INDEX_HTTPS: 'https://index.bostrom.cybernode.ai/v1/graphql',
    CYBER_INDEX_WEBSOCKET: 'wss://index.bostrom.cybernode.ai/v1/graphql',
  
    // CHAIN_ID: 'space-pussy-1',
    // CYBER_NODE_URL_API: 'https://rpc.space-pussy-1.cybernode.ai',
    // CYBER_WEBSOCKET_URL: 'wss://rpc.space-pussy-1.cybernode.ai/websocket',
    // CYBER_NODE_URL_LCD: 'https://lcd.space-pussy-1.cybernode.ai',
    // CYBER_INDEX_HTTPS: 'https://index.space-pussy-1.cybernode.ai/v1/graphql',
    // CYBER_INDEX_WEBSOCKET: 'wss://index.space-pussy-1.cybernode.ai/v1/graphql',
  
    CYBER_GATEWAY: 'https://gateway.ipfs.cybernode.ai',
  
    BECH32_PREFIX_ACC_ADDR_CYBER: 'bostrom',
    BECH32_PREFIX_ACC_ADDR_CYBERVALOPER: 'bostromvaloper',
    MEMO_KEPLR: '[bostrom] cyb.ai, using keplr',
  };



export const CustomChains = defineChains({
  bostrom: {
    chainId: CYBER.CHAIN_ID,
    currencies: [
      {
        coinDenom: CYBER.DENOM_CYBER,
        coinMinimalDenom: CYBER.DENOM_CYBER,
        coinDecimals: 6,
        coinGeckoId: CYBER.CHAIN_ID,
        coinImageUrl: "https://raw.githubusercontent.com/cosmos/chain-registry/master/bostrom/images/boot.png",
      },
    ],
    rpc: CYBER.CYBER_NODE_URL_API,
    rest: CYBER.CYBER_NODE_URL_LCD,
  },
});

  
  const configKeplr = (prefix: string) => {
    return {
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
        bech32PrefixAccAddr: prefix,
        bech32PrefixAccPub: `${prefix}pub`,
        bech32PrefixValAddr: `${prefix}valoper`,
        bech32PrefixValPub: `${prefix}valoperpub`,
        bech32PrefixConsAddr: `${prefix}valcons`,
        bech32PrefixConsPub: `${prefix}valconspub`,
      },
      currencies: [
        {
          coinDenom: CYBER.DENOM_CYBER.toUpperCase(),
          coinMinimalDenom: CYBER.DENOM_CYBER,
          coinDecimals: 0,
        },
        {
          coinDenom: 'H',
          coinMinimalDenom: 'hydrogen',
          coinDecimals: 0,
        },
        {
          coinDenom: 'V',
          coinMinimalDenom: 'millivolt',
          coinDecimals: 3,
        },
        {
          coinDenom: 'A',
          coinMinimalDenom: 'milliampere',
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
      coinType: 118,
      gasPriceStep: {
        low: 0,
        average: 0,
        high: 0.01,
      },
      features: ['stargate', 'ibc-transfer'],
    };
  };
  
  export { CYBER, configKeplr };
  