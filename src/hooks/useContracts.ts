import { useMemo } from "react";
import { useCw20ContractFactory } from "./useCw20";
import { useSwapPoolContractFactory } from "./useSwapPool";
import { useSwapPoolFactory } from "./useSwapPoolFactory";

export const useContracts = () => {
  const Cw20ContractFactory = useCw20ContractFactory();
  const poolFactory = useSwapPoolFactory();
  const PoolContractFactory = useSwapPoolContractFactory();

  return useMemo(() => {
    if (!Cw20ContractFactory || !PoolContractFactory || !poolFactory) {
      return undefined;
    }
    return {
      Cw20ContractFactory,
      PoolContractFactory,
      poolFactory,
    };
  }, [Cw20ContractFactory, PoolContractFactory, poolFactory]);
};
