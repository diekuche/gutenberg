import { PoolDenom, TokenDetails } from "types/tokens";
import { getShortTokenName } from "utils/tokens";
import { Cw20Client, Cw20QueryClient } from "generated/Cw20.client";
import BigNumber from "bignumber.js";
import { GasLimit } from "config/cosmwasm";
import { Coin } from "@cosmjs/amino";
import { SwapPoolClient } from "generated/SwapPool.client";
import { Account } from "classes/Account";
import { SwapPoolFactoryClient } from "generated/SwapPoolFactory.client";
import { SWAP_POOL_INFO } from "queries/pool";
import { USER_TOKEN_DETAILS } from "../queries/tokens";

export const CREATE_POOL = async (
  account: Account,
  lpFee: number,
  token1Denom: PoolDenom,
  token2Denom: PoolDenom,
) => {
  const { address, chain, signer } = account;
  const factory = new SwapPoolFactoryClient(
    await chain.getSigningCosmWasmClient(signer),
    address,
    chain.cosmwasmConfigs.factoryAddress,
  );
  const CreatePoolResponse = await factory.createPool({
    lpFeePercent: lpFee.toString(),
    token1Denom,
    token2Denom,
  }, chain.calculateFee(GasLimit.PoolFactoryCreatePool));
  return CreatePoolResponse;
};

export const ADD_LIQUIDITY = async (
  account: Account,
  poolAddress: string,
  token1: TokenDetails,
  token1Amount: string,
  token2: TokenDetails,
  token2Amount: string,
) => {
  const { chain } = account;
  const token1RealAmount = token1Amount;
  const token2RealAmount = token2Amount;
  const { address } = account;
  const signingCosmWasmClient = await chain.getSigningCosmWasmClient(account.signer);
  const cosmWasmClient = await chain.getCosmWasmClient();

  if (token1.type === "cw20") {
    const token1CwExecutor = new Cw20Client(
      signingCosmWasmClient,
      address,
      token1.address,
    );
    const token1CwQuery = new Cw20QueryClient(cosmWasmClient, token1.address);
    const token1Allowance = await token1CwQuery.allowance({
      owner: address,
      spender: poolAddress,
    });
    if (+token1Allowance.allowance < +token1RealAmount) {
      console.log(
        `Increase allowance ${token1RealAmount} for token ${token1.symbol} (${token1.decimals})
           from ${address} to ${poolAddress}`,
      );
      await token1CwExecutor.increaseAllowance({
        amount: token1RealAmount,
        spender: poolAddress,
      }, chain.calculateFee(GasLimit.Cw20IncreaseAllowance));
    }
  }
  if (token2.type === "cw20") {
    const token2CwExecutor = new Cw20Client(
      signingCosmWasmClient,
      address,
      token2.address,
    );
    const token2CwQuery = new Cw20QueryClient(cosmWasmClient, token2.address);

    const token2Allowance = await token2CwQuery.allowance({
      owner: address,
      spender: poolAddress,
    });
    if (BigNumber(token2Allowance.allowance).lt(BigNumber(token1RealAmount))) {
      console.log(
        `Increase allowance ${token2RealAmount} for token ${token2.symbol} (${token2.decimals})
           from ${address} to ${poolAddress}`,
      );
      await token2CwExecutor.increaseAllowance({
        amount: token2RealAmount,
        spender: poolAddress,
      }, chain.calculateFee(GasLimit.Cw20IncreaseAllowance));
    }
  }

  const poolFactoryExecutor = new SwapPoolClient(
    signingCosmWasmClient,
    address,
    poolAddress,
  );

  console.log(`Adding liquidity to pool ${poolAddress}`);
  console.log(`Token1: ${getShortTokenName(token1)} (${token1.decimals})`);
  console.log(`Token2: ${getShortTokenName(token2)} (${token2.decimals})`);
  console.log(`Token1 amount: ${token1RealAmount}, max token2: ${token2RealAmount}`);

  const funds: Coin[] = [];
  if (token1.type === "native") {
    funds.push({
      denom: token1.minimalDenom || token1.denom,
      amount: token1RealAmount,
    });
  }
  if (token2.type === "native") {
    funds.push({
      denom: token2.minimalDenom || token2.denom,
      amount: token2RealAmount,
    });
  }
  console.log("funds", funds);

  const result = await poolFactoryExecutor.addLiquidity({
    token1Amount: token1RealAmount,
    maxToken2: token2RealAmount,
    minLiquidity: "0",
  }, chain.calculateFee(GasLimit.PoolAddLiquidity), undefined, funds);
  try {
    chain.invalidate(SWAP_POOL_INFO(poolAddress));
    chain.invalidate(USER_TOKEN_DETAILS(token1, address));
    chain.invalidate(USER_TOKEN_DETAILS(token2, address));
  } catch (e) {
    console.log("Invalidate user tokens info failed");
    console.log(e);
  }
  return result;
};
