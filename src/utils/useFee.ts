import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { useAccount, useClients } from "graz";
import { useEffect, useState } from "react";

export const useFee = (amount = 60000) => {
    const { data: account } = useAccount();
    const [denom, setDenom] = useState("");
    const { data } = useClients();
    const client = data?.stargate;

    const fetchBalance = async () => {
        if (account?.bech32Address) {
          const balances = await client?.getAllBalances(account.bech32Address);
          if (balances?.[0]) {
            setDenom(balances[0].denom);
          }
        }
    };

    fetchBalance();

    useEffect(() => {

    }, [client, account])
    
    const gasPrice = GasPrice.fromString(`0.001${denom || 'boot'}`);
    return calculateFee(600000, gasPrice)
}