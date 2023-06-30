import { useMemo } from "react";
import { useContractFactory } from "./useContractFactory";
import { Cw20Client, Cw20QueryClient } from "../ts/Cw20.client";
import { SwapPoolFactoryClient, SwapPoolFactoryQueryClient } from "../ts/SwapPoolFactory.client";
import { SwapPoolClient, SwapPoolQueryClient } from "../ts/SwapPool.client";

export const useContracts = () => {
  const Cw20ContractFactory = useContractFactory(
    Cw20QueryClient,
    Cw20Client,
  );
  const PoolFactoryContractFactory = useContractFactory(
    SwapPoolFactoryQueryClient,
    SwapPoolFactoryClient,
  );
  const PoolContractFactory = useContractFactory(
    SwapPoolQueryClient,
    SwapPoolClient,
  );

  return useMemo(() => {
    if (!Cw20ContractFactory || !PoolContractFactory || !PoolFactoryContractFactory) {
      return undefined;
    }
    return {
      Cw20ContractFactory,
      PoolContractFactory,
      PoolFactoryContractFactory,
    };
  }, [Cw20ContractFactory, PoolContractFactory, PoolFactoryContractFactory]);
};

export type ContractsContext = NonNullable<ReturnType<typeof useContracts>>;
