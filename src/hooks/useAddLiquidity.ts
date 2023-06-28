/* eslint-disable consistent-return */
import { useMemo } from "react";
import { useAccount } from "graz";
import { isCw20 } from "../utils/tokens";
import { useFee } from "../utils/useFee";
import { useContracts } from "./useContracts";
import { TokenDetails } from "./useQueries";

export const useAddLiquidity = () => {
  const fee = useFee();
  const contracts = useContracts();
  const { data: account } = useAccount();

  const addLiquidity = useMemo(() => {
    if (!contracts || !account) {
      return;
    }
    return async (
      poolAddress: string,
      token1: TokenDetails,
      token1Amount: string,
      token2: TokenDetails,
      token2Amount: string,
    ) => {
      const token1RealAmount = token1Amount;
      const token2RealAmount = token2Amount;
      if (isCw20(token1.denom)) {
        const token1Cw = contracts.Cw20ContractFactory(token1.denom.cw20, account.bech32Address);
        const token1Allowance = await token1Cw.querier.allowance({
          owner: account.bech32Address,
          spender: poolAddress,
        });
        if (+token1Allowance.allowance < +token1RealAmount) {
          await token1Cw.executor.increaseAllowance({
            amount: token1RealAmount,
            spender: poolAddress,
          }, fee);
        }
      }
      if (isCw20(token2.denom)) {
        const token2Cw = contracts.Cw20ContractFactory(token2.denom.cw20, account.bech32Address);
        const token2Allowance = await token2Cw.querier.allowance({
          owner: account.bech32Address,
          spender: poolAddress,
        });
        if (+token2Allowance.allowance < +token2RealAmount) {
          await token2Cw.executor.increaseAllowance({
            amount: token2RealAmount,
            spender: poolAddress,
          }, fee);
        }
      }
      return contracts.PoolContractFactory(
        poolAddress,
        account.bech32Address,
      ).executor.addLiquidity({
        token1Amount: token1RealAmount,
        maxToken2: token2RealAmount,
        minLiquidity: "0",
      }, fee);
    };
  }, [account, contracts]);
  return {
    addLiquidity,
  };
};
