import { useEffect, useState } from "react";
import { useChain } from "hooks/useChain";
import { getShortTokenName } from "utils/tokens";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { Chain } from "classes/Chain";
import { CW20_USER_TOKEN_DETAILS } from "queries/cw20";
import { useAccount } from "hooks/useAccount";
import { Cw20Client } from "generated/Cw20.client";
import { Account } from "classes/Account";
import { useStore } from "hooks/useStore";
import { QueryCache } from "classes/QueryCache";
import { STORE_USER_CW20_TOKENS_KEY } from "store/cw20";
import { GasLimit } from "config/cosmwasm";
import { TokenListItem, UserTokenDetails } from "types/tokens";

const fetchCw20Token = async (
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

const fetchNativeToken = async (
  chain: Chain,
  denom: string,
  accountAddress: string,
  userBalance?: string,
): Promise<TokenItem> => {
  const bank = await chain.bank();
  const isFactoryToken = denom.toLowerCase().startsWith("factory/");
  let balance = userBalance;
  if (!balance) {
    balance = (await bank.balance(accountAddress, denom)).amount;
  }
  if (isFactoryToken) {
    const meta = await bank.denomMetadata(denom);
    return {
      id: denom,
      type: "native",
      denom,
      balance,
      decimals: meta.denomUnits[0].exponent,
      updatedAt: new Date().getTime(),
    };
  }
  const native = chain.config.currencies.find((currency) => currency.coinMinimalDenom
  === denom);
  if (native) {
    return {
      id: denom,
      type: "native",
      logo: native.coinImageUrl,
      denom,
      decimals: native.coinDecimals,
      balance,
      updatedAt: new Date().getTime(),
    };
  }
  throw new Error(`Unknown token ${denom}`);
};

const fetchUserTokens = async (
  chain: Chain,
  account: Account,
  store: QueryCache,
  pushTokens: (tokens: TokenItem[]) => void,
) => {
  const bank = await chain.bank();
  const balances = await bank.allBalances(account.address);
  const userCw20Tokens = await store.get(STORE_USER_CW20_TOKENS_KEY(chain, account));
  await Promise.all(balances.map(async (coin) => {
    const token = await fetchNativeToken(chain, coin.denom, account.address, coin.amount);
    pushTokens([token]);
  }).concat(userCw20Tokens.map(async (tokenAddress) => {
    const token = await fetchCw20Token(chain, tokenAddress, account.address);
    pushTokens([token]);
  })));
};

const userTokenToListItem = (token: TokenItem, address: string): TokenListItem => {
  const isCw20 = token.type === "cw20";
  let shortName: string;
  if (isCw20) {
    shortName = token.name;
  } else {
    const isFactoryToken = isCw20 ? false : token.denom.toLowerCase().startsWith("factory/");
    shortName = isFactoryToken ? getShortTokenName(token.denom) : token.denom;
  }
  return {
    shortName,
    id: token.id,
    key: `${token.id}_${token.updatedAt}`,
    logoUrl: token.logo || "",
    userBalance: BigNumber(token.balance).dividedBy(10 ** token.decimals),
    isBurnable: isCw20 && token.minter === address,
    isMintable: isCw20 && token.minter === address,
    isRemovable: isCw20,
    isSendable: true,
  };
};

type TokenItem = UserTokenDetails & {
  id: string;
  updatedAt: number;
};

export const useUserTokens = () => {
  const chain = useChain();
  const { account } = useAccount();
  const store = useStore();

  const [loading, setLoading] = useState(true);
  const [addTokenLoading, setAddTokenLoading] = useState(false);
  const [tokenSentIds, setTokenSentIds] = useState<string[]>([]);

  const [tokens, setTokens] = useState<TokenItem[]>([]);

  useEffect(() => {
    setLoading(true);
    setTokens([]);
    if (!account) {
      return;
    }
    fetchUserTokens(
      chain,
      account,
      store,

      (newTokens) => {
        setTokens((oldTokens) => oldTokens.filter(
          (oldToken) => !newTokens.find((newToken) => newToken.id === oldToken.id),
        ).concat(newTokens));
      },
    ).finally(() => setLoading(false));
  }, [account, chain]);

  const addCw20Token = (tokenAddress: string) => {
    if (!chain.validateAddress(tokenAddress)) {
      toast.error("Invalid token address");
      return;
    }
    if (tokens.find((token) => token.type === "cw20" && token.address === tokenAddress)) {
      toast.error("Token already exists");
      return;
    }
    if (!account) {
      toast.error("Account is not connected");
      return;
    }
    setAddTokenLoading(true);
    fetchCw20Token(chain, tokenAddress, account.address).then(async (newToken) => {
      await store.setInArray(STORE_USER_CW20_TOKENS_KEY(chain, account).key, tokenAddress);
      setTokens(tokens.filter((t) => t.id !== newToken.id).concat(newToken));
    }).catch((e) => {
      console.log(e);
      toast.error(`Unknown error: ${e}`);
    }).finally(() => setAddTokenLoading(false));
  };

  const checkAccount = () => {
    if (!account) {
      toast.error("Account is not connected");
      throw new Error("Account is not connected");
    }
    return account;
  };

  const updateToken = async (token: TokenItem) => {
    if (!account) {
      return;
    }
    const newToken = await (token.type === "cw20"
      ? fetchCw20Token(chain, token.address, account.address)
      : fetchNativeToken(chain, token.denom, account.address));
    setTokens(tokens.filter((t) => t.id !== token.id).concat(newToken));
  };

  const onBurn = () => {};
  const onMint = () => {};
  const onSend = async (id: string, recipient: string, amount: string) => {
    if (!account) {
      toast.error("Account is not connected");
      return;
    }
    const { signer } = checkAccount();
    if (!chain.validateAddress(recipient)) {
      toast.error("Invalid recipient");
      return;
    }
    console.log(`Send for ${id} to ${recipient}, amount: ${amount}`);
    const token = tokens.find((t) => t.id === id);
    if (!token) {
      toast.error(`Not found token ${id}`);
      return;
    }

    const realAmount = BigNumber(amount).multipliedBy(BigNumber(10 ** token.decimals)).toFixed();

    const signingCosmWasmClient = await chain.getSigningCosmWasmClient(signer);
    let error = "";
    try {
      if (token.type === "cw20") {
        const contractAddress = id.substring(5);
        const response = await new Cw20Client(
          signingCosmWasmClient,
          account.address,
          contractAddress,
        ).send({
          amount: realAmount,
          contract: recipient,
          msg: "",
        }, chain.calculateFee(GasLimit.Cw20Send));
        console.log("Cw20 token send response", response);
      } else {
        const result = await (await chain.getSigningCosmWasmClient(account.signer)).sendTokens(
          account.address,
          recipient,
          [{
            denom: token.denom,
            amount: realAmount,
          }],
          chain.calculateFee(GasLimit.NativeSendTokens),
        );
        console.log("Send token result ", result);
        if (result.code !== 0) {
          error = result.rawLog || `Unknown error ${result.code}`;
        }
      }
      if (error) {
        throw new Error(error);
      }
      setTokenSentIds((current) => current.concat(token.id));
      setTimeout(() => {
        setTokenSentIds((current) => current.filter((t) => t !== token.id));
        updateToken(token);
      }, 2000);
      toast("Success", {
        type: "success",
        autoClose: 2000,
      });
    } catch (e) {
      toast(String(e), {
        type: "error",
      });
      console.log("Error when send tokens");
      console.log("error", e);
    }
  };
  const onDelete = async (id: string) => {
    if (!account) {
      return;
    }
    const token = tokens.find((t) => t.id === id);
    if (!token || token.type !== "cw20") {
      return;
    }
    await store.deleteFromArray(STORE_USER_CW20_TOKENS_KEY(chain, account).key, token.address);
    setTokens((old) => old.filter((t) => t.id !== id));
  };

  return {
    addTokenLoading,
    loading,
    addCw20Token,
    onBurn,
    onDelete,
    onMint,
    onSend,
    tokenSentIds,
    tokens: account ? tokens
      .sort((a, b) => {
        if (a.type === "native" && b.type === "cw20") {
          return -1;
        }
        if (a.type === "cw20" && b.type === "native") {
          return 1;
        }
        return a.id.localeCompare(b.id);
      })
      .map((token) => userTokenToListItem(token, account.address)) : [],
  };
};
