import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { useChain } from "../hooks/useChain";
import { ChainId, Chains } from "../config/chains";

export const useFee = () => {
  const { chainId } = useChain();
  return calculateFee(
    600000,
    GasPrice.fromString(`0.001${Chains[chainId as ChainId].feeCurrencies[0].coinDenom}`),
  );
};
