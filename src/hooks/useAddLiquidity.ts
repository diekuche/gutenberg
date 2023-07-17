/* eslint-disable consistent-return */
import { useMemo } from "react";
import { Coin } from "@cosmjs/amino";
import { isCw20, isNative } from "../utils/tokens";
import { useFee } from "../utils/useFee";
import { useContracts } from "./useContracts";
import { TokenDetails, USER_TOKEN_DETAILS, useQueries } from "./useQueries";
import { useWalletContext } from "./useWalletContext";

export const useAddLiquidity = () => {
  const fee = useFee();
  const contracts = useContracts();
  const queries = useQueries();
  const walletContext = useWalletContext();

  const addLiquidity = useMemo(() => {
    if (!contracts || !walletContext || !queries) {
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
      const { account } = walletContext;
      if (isCw20(token1.denom)) {
        const token1Cw = contracts.Cw20ContractFactory(token1.denom.cw20);
        const token1CwExecutor = token1Cw.createExecutor(
          walletContext,
        );
        const token1Allowance = await token1Cw.querier.allowance({
          owner: account.bech32Address,
          spender: poolAddress,
        });
        if (+token1Allowance.allowance < +token1RealAmount) {
          console.log(
            `Increase allowance ${token1RealAmount} for token ${token1.symbol} (${token1.decimals})
             from ${account.bech32Address} to ${poolAddress}`,
          );
          await token1CwExecutor.increaseAllowance({
            amount: token1RealAmount,
            spender: poolAddress,
          }, fee);
        }
      }
      if (isCw20(token2.denom)) {
        const token2Cw = contracts.Cw20ContractFactory(token2.denom.cw20);
        const token2CwExecutor = token2Cw.createExecutor(
          walletContext,
        );
        const token2Allowance = await token2Cw.querier.allowance({
          owner: account.bech32Address,
          spender: poolAddress,
        });
        if (+token2Allowance.allowance < +token2RealAmount) {
          console.log(
            `Increase allowance ${token2RealAmount} for token ${token2.symbol} (${token2.decimals})
             from ${account.bech32Address} to ${poolAddress}`,
          );
          await token2CwExecutor.increaseAllowance({
            amount: token2RealAmount,
            spender: poolAddress,
          }, fee);
        }
      }
      const poolFactoryExecutor = contracts.PoolContractFactory(
        poolAddress,
      ).createExecutor(walletContext);
      console.log(`Adding liquidity to pool ${poolAddress}`);
      console.log(`Token1: ${token1.symbol} (${token1.decimals})`);
      console.log(`Token2: ${token2.symbol} (${token2.decimals})`);
      console.log(`Token1 amount: ${token1RealAmount}, max token2: ${token2RealAmount}`);

      const funds: Coin[] = [];
      if (isNative(token1.denom)) {
        funds.push({
          denom: token1.denom.native,
          amount: token1RealAmount,
        });
      }
      if (isNative(token2.denom)) {
        funds.push({
          denom: token2.denom.native,
          amount: token2RealAmount,
        });
      }

      const result = await poolFactoryExecutor.addLiquidity({
        token1Amount: token1RealAmount,
        maxToken2: token2RealAmount,
        minLiquidity: "0",
      }, fee, undefined, funds);
      try {
        queries.cache.getOrUpdate(USER_TOKEN_DETAILS(token1.denom, account.bech32Address), queries);
        queries.cache.getOrUpdate(USER_TOKEN_DETAILS(token2.denom, account.bech32Address), queries);
      } catch (e) {
        console.log("Invalidate user tokens info failed");
        console.log(e);
      }
      return result;
    };
  }, [walletContext, contracts]);
  return {
    addLiquidity,
  };
};
