import { StargateClient } from "@cosmjs/stargate";
import { defineChains, connect } from "graz";

export const Bostrom = defineChains({
    cosmos: {
      chainId: "bostrom",
      currencies: [
        {
          coinDenom: "boot",
          coinMinimalDenom: "boot",
          coinDecimals: 6,
          coinGeckoId: "bostrom",
          coinImageUrl: "https://raw.githubusercontent.com/cosmos/chain-registry/master/bostrom/images/boot.png",
        },
      ],
      rpc: "https://rpc.cosmos.directory/bostrom",
      rest: "https://rest.cosmos.directory/bostrom",
    },
  });
  
  connect(Bostrom.cosmos);

const chainId = Bostrom.cosmos.chainId;
const rpc = Bostrom.cosmos.rpc;

export const getAddress = async () => {
    if (window.keplr) {
        await window.keplr.enable(chainId);
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        if (accounts) {
            return accounts[0]?.address;
        }
    }
}

export const getBalance = async () => {
    if (window.keplr) {
        const client = await StargateClient.connect(rpc);
        const address = await getAddress();
        if (address) {
            const balances = await client.getAllBalances(address);
            return balances?.filter((balance) => balance.denom === 'boot')[0]?.amount
        }
    }
};