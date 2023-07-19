import { Chain } from "classes/Chain";
import { TokenDetails, UserTokenDetails } from "types/tokens";
import { CW20_USER_TOKEN_DETAILS } from "./cw20";

export const USER_TOKEN_DETAILS = (token: TokenDetails, userAddress: string) => {
  if (token.type === "native") {
    return {
      queryKey: `/v0.1/user/${userAddress}/native/${token.denom}/details`,
      queryFn: async ({
        chain,
      }: {
        chain: Chain
      }) => {
        const bank = await chain.bank();
        const native = await bank.balance(userAddress, token.denom);
        return {
          ...token,
          balance: native.amount,
        };
      },
      cacheTime: 1,
    };
  }
  return {
    queryKey: `/v0.1/user/${userAddress}/cw20/${token.address}/details`,
    queryFn: (
      context: {
        chain: Chain
      },
    ): Promise<UserTokenDetails> => CW20_USER_TOKEN_DETAILS(
      token.address,
      userAddress,
    ).queryFn(context),
    cacheTime: 1,
  };
};
