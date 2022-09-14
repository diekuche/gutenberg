import { StargateClient } from "@cosmjs/stargate";

const chainId = "bostrom";
const rpc = "https://rpc.bostrom.cybernode.ai";

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