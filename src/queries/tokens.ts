import { Chain } from "classes/Chain";
import { TokenDetails, TokenItem, UserTokenDetails } from "types/tokens";
import { Account } from "classes/Account";
import { QueryCache } from "classes/QueryCache";
import { STORE_USER_CW20_TOKENS_KEY } from "store/cw20";
import { createRpcQueryExtension } from "tokenfactory";
import { CW20_USER_TOKEN_DETAILS } from "./cw20";
import { NATIVE_TOKEN_DETAILS } from "./native";

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
        const native = await bank.balance(userAddress, token.minimalDenom || token.denom);
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

export const fetchUserCw20Token = async (
  chain: Chain,
  tokenAddress: string,
  accountAddress: string,
): Promise<TokenItem> => {
  const token = await chain.query(CW20_USER_TOKEN_DETAILS(tokenAddress, accountAddress));
  return {
    id: `cw20:${token.address}`,
    type: "cw20",
    name: token.name,
    symbol: token.symbol,
    address: token.address,
    logo: token.logo || "",
    balance: token.balance,
    decimals: token.decimals,
    minter: token.minter,
    updatedAt: new Date().getTime(),
  };
};

export const fetchUserNativeToken = async (
  chain: Chain,
  denom: string,
  accountAddress: string,
  userBalance?: string,
): Promise<TokenItem> => {
  const updatedAt = new Date().getTime();
  const bank = await chain.bank();
  let balance = userBalance;
  if (!balance) {
    balance = (await bank.balance(accountAddress, denom)).amount;
  }
  const details = await chain.query(NATIVE_TOKEN_DETAILS(denom));
  return {
    ...details,
    id: details.denom,
    balance,
    updatedAt,
  };
};

export const fetchUserTokens = async (
  chain: Chain,
  account: Account,
  store: QueryCache,
  pushTokens: (tokens: TokenItem[]) => void,
) => {
  const bank = await chain.bank();
  const balances: {
    denom: string;
    amount: string | undefined;
  }[] = await bank.allBalances(account.address);

  let tokenFactoryTokens: string[] = [];
  if (chain.config.features?.includes("tokenfactory")) {
    const tokenFactoryQuery = createRpcQueryExtension(await chain.getQueryClient());
    tokenFactoryTokens = (await tokenFactoryQuery.denomsFromCreator({
      creator: account.address,
    })).denoms;
  }

  const userCw20Tokens = await store.get(STORE_USER_CW20_TOKENS_KEY(chain, account));
  await Promise.all(balances.concat(tokenFactoryTokens.map((t) => ({
    denom: t,
    amount: undefined,
  }))).map(async (coin) => {
    const token = await fetchUserNativeToken(chain, coin.denom, account.address, coin.amount);
    pushTokens([token]);
  }).concat(userCw20Tokens.map(async (tokenAddress) => {
    const token = await fetchUserCw20Token(chain, tokenAddress, account.address);
    pushTokens([token]);
  })));
};
