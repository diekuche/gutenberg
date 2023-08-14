import { ChainInfo } from "@keplr-wallet/types";
import { chains } from "chain-registry";

const chainName = "neutron-1";

const chain = chains.find(({ chain_id }) => chain_id === chainName);
if (!chain) {
  throw new Error(`Not found chain ${"desmos-mainnet"} in registry`);
}
export const NeutronMainnet: ChainInfo = {
  rpc: (chain.apis?.rpc || [])[0].address || "https://rpc-neutron.keplr.app",
  rest: (chain.apis?.rest || [])[0].address || "https://rest-kralum.neutron-1.neutron.org",
  chainId: "neutron-1",
  chainName: "Neutron",
  chainSymbolImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/neutron/chain.png",
  stakeCurrency: {
    coinDenom: "STAKE",
    coinMinimalDenom: "ustake",
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "neutron",
    bech32PrefixAccPub: "neutronpub",
    bech32PrefixValAddr: "neutronvaloper",
    bech32PrefixValPub: "neutronvaloperpub",
    bech32PrefixConsAddr: "neutronvalcons",
    bech32PrefixConsPub: "neutronvalconspub",
  },
  currencies: [
    {
      coinDenom: "NTRN",
      coinMinimalDenom: "untrn",
      coinDecimals: 6,
      coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/neutron/untrn.png",
    },
    {
      coinDenom: "STAKE",
      coinMinimalDenom: "ustake",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "NTRN",
      coinMinimalDenom: "untrn",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.01,
        average: 0.01,
        high: 0.01,
      },
    },
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.005,
        average: 0.005,
        high: 0.005,
      },
    },
    {
      coinDenom: "USDC",
      coinMinimalDenom: "ibc/F082B65C88E4B6D5EF1DB243CDA1D331D002759E938A0F5CD3FFDC5D53B3E349",
      coinDecimals: 6,
      gasPriceStep: {
        low: 0.05,
        average: 0.05,
        high: 0.05,
      },
    },
  ],
  features: ["cosmwasm"],
};
