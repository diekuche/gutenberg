import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { CustomChains } from "./config";
import { useChain } from "../hooks/useChain";

export const useFee = () => {
  const { chainId } = useChain();
  return calculateFee(
    600000,
    GasPrice.fromString(`0.001${CustomChains[chainId].currencies[0].coinDenom}`),
  );
};
