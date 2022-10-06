import { StargateClient } from "@cosmjs/stargate";
import { CYBER } from "./config";


export const getAddress = async () => {
    if (window.keplr) {
        const offlineSigner = window.keplr.getOfflineSigner(CYBER.CHAIN_ID);
        const [{ address }] = await offlineSigner.getAccounts();
        return address;
    }
}

export const getBalance = async () => {
    if (window.keplr) {
        const client = await StargateClient.connect(CYBER.CYBER_NODE_URL_API);
        
        const address = await getAddress();
        if (address) {
            const balances = await client.getAllBalances(address);
            return balances?.filter((balance) => balance.denom === 'boot')[0]?.amount
        }
    }
};