import { Chain } from "classes/Chain";
import { PoolDenom, UserTokenDetails } from "types/tokens";
import { NATIVE_TOKEN_DETAILS } from "./native";
import { CW20_TOKEN_DETAILS, CW20_USER_TOKEN_DETAILS } from "./cw20";

export const TOKEN_DETAILS = (denom: PoolDenom) => {
  if ("native" in denom) {
    return NATIVE_TOKEN_DETAILS(denom);
  }
  return {
    queryKey: `/v0.1/cw20/${denom.cw20}/details`,
    queryFn: (context: {
      chain: Chain
    }) => CW20_TOKEN_DETAILS(
      denom.cw20,
    ).queryFn(context),
  };
};

export const USER_TOKEN_DETAILS = (denom: PoolDenom, userAddress: string) => {
  if ("native" in denom) {
    return {
      queryKey: `/v0.1/user/${userAddress}/native/${denom.native}/details`,
      queryFn: async ({
        chain,
      }: {
        chain: Chain
      }) => {
        const bank = await chain.bank();
        const details = await chain.query(NATIVE_TOKEN_DETAILS(denom));
        const native = await bank.balance(userAddress, denom.native);
        return {
          ...details,
          balance: native.amount,
        };
      },
      cacheTime: 1,
    };
  }
  return {
    queryKey: `/v0.1/user/${userAddress}/cw20/${denom.cw20}/details`,
    queryFn: (
      context: {
        chain: Chain
      },
    ): Promise<UserTokenDetails> => CW20_USER_TOKEN_DETAILS(
      denom.cw20,
      userAddress,
    ).queryFn(context),
    cacheTime: 1,
  };
};