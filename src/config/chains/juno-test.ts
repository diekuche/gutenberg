import { ChainInfo } from "@keplr-wallet/types";

const JunoTest: ChainInfo = {
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
};

export default JunoTest;
