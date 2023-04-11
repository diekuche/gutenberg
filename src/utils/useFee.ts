import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { useBalances } from "graz";

export const useFee = (amount = 60000) => {
    const { data: balances = [] } = useBalances();
    const currentBalance = balances[0];
    const gasPrice = GasPrice.fromString(`0.001${currentBalance?.denom || 'boot'}`);
    return calculateFee(600000, gasPrice)
}