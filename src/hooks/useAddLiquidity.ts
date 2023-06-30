/* eslint-disable consistent-return */
import { useMemo } from "react";
import { isCw20, tokenFloatToAmount } from "../utils/tokens";
import { useFee } from "../utils/useFee";
import { useContracts } from "./useContracts";
import { TokenDetails } from "./useQueries";
import { useWalletContext } from "./useWalletContext";

export const useAddLiquidity = () => {
  const fee = useFee();
  const contracts = useContracts();
  const walletContext = useWalletContext();

  const addLiquidity = useMemo(() => {
    if (!contracts || !walletContext) {
      return;
    }
    return async (
      poolAddress: string,
      token1: TokenDetails,
      token1Amount: string,
      token2: TokenDetails,
      token2Amount: string,
    ) => {
      const token1RealAmount = tokenFloatToAmount(token1Amount, token1.decimals).toString();
      const token2RealAmount = tokenFloatToAmount(token2Amount, token1.decimals).toString();
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
      console.log(`Token1 amount: ${token1Amount}, max token2: ${token2RealAmount}`);
      return poolFactoryExecutor.addLiquidity({
        token1Amount: token1RealAmount,
        maxToken2: token2RealAmount,
        minLiquidity: "0",
      }, fee);
    };
  }, [walletContext, contracts]);
  return {
    addLiquidity,
  };
};
