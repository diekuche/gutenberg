import { ChainInfo } from "@keplr-wallet/types";
import { chains } from "chain-registry";

const chain = chains.find(({ chain_name }) => chain_name === "desmos");
if (!chain) {
  throw new Error(`Not found chain ${"desmos-mainnet"} in registry`);
}
export const DesmosMainnet: ChainInfo = {
  chainId: "desmos-mainnet",
  chainName: "Desmos",
  chainSymbolImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/desmos-mainnet/chain.png",
  rpc: "https://rpc.mainnet.desmos.network",
  rest: "https://api.mainnet.desmos.network",
  bip44: {
    coinType: 852,
  },
  bech32Config: {
    bech32PrefixAccAddr: "desmos",
    bech32PrefixAccPub: "desmospub",
    bech32PrefixValAddr: "desmosvaloper",
    bech32PrefixValPub: "desmosvaloperpub",
    bech32PrefixConsAddr: "desmosvalcons",
    bech32PrefixConsPub: "desmosvalconspub",
  },
  currencies: [
    {
      coinDenom: "DSM",
      coinMinimalDenom: "udsm",
      coinDecimals: 6,
      coinGeckoId: "desmos",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "DSM",
      coinMinimalDenom: "udsm",
      coinDecimals: 6,
      coinGeckoId: "desmos",
      gasPriceStep: {
        low: 0.01,
        average: 0.03,
        high: 0.05,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "DSM",
    coinMinimalDenom: "udsm",
    coinDecimals: 6,
    coinGeckoId: "desmos",
  },
  features: [],
};
