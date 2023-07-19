import { Account } from "classes/Account";
import { Chain } from "classes/Chain";

export const STORE_USER_CW20_TOKENS_KEY = (
  chain: Chain,
  account: Account,
) => ({
  key: `chain/${chain.config.chainId}/user/${account.address}/cw20`,
  default: [] as string[],
});
