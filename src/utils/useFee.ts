// import { CosmWasmClient } from "cosmwasm";
import { GasPrice, calculateFee } from "@cosmjs/stargate";
import {
  useAccount, useBalances, useActiveChain, useClients,
} from "graz";
import { useEffect, useState } from "react";
import { CustomChains } from "./config";

export const useFee = (amount = 60000) => {
  const activeChain = useActiveChain();
  const chainId = activeChain?.chainId || "bostrom";
  return calculateFee(
    600000,
    GasPrice.fromString(`0.001${CustomChains[chainId].currencies[0].coinDenom}`),
  );

  // const { data: account } = useAccount();
  // const activeChain = useActiveChain()
  // const balances = useBalances();
  // const [denom, setDenom] = useState(CustomChains.junotest.currencies[0].coinDenom);
  // // const { data } = useClients();
  // // const client = data?.stargate;

  // // const fetchBalance = async () => {
  // //   if (!activeChain) {
  // //     return;
  // //   }
  // //   const client = await CosmWasmClient.connect(activeChain.rpc);
  // //     if (account?.bech32Address) {
  // //       const res = balances;
  // //       console.log(`res`, res, account.bech32Address);
  // //       // const balances = await client?.getAllBalances(account.bech32Address);
  // //       // if (balances?.[0]) {
  // //       //   setDenom(balances[0].denom);
  // //       // }
  // //     }
  // // };

  // // fetchBalance();

  // // useEffect(() => {

  // // }, [client, account])

  // const gasPrice = GasPrice.fromString(`0.001${denom || 'boot'}`);
  // return calculateFee(600000, gasPrice)
};
