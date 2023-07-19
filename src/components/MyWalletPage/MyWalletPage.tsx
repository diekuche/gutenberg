import TokenList, { TokenListItem } from "ui/MyWalletPage/TokenList";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
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
import Button from "ui/Button";
import { UserTokenDetails } from "types/tokens";
import styles from "./MyWalletPage.module.css";

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
    };
  }
  throw new Error(`Unknown token ${denom}`);
};

const fetch = async (
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
    key: token.id + new Date().getTime(),
    logoUrl: token.logo || "",
    userBalance: BigNumber(token.balance).dividedBy(10 ** token.decimals),
    isBurnable: isCw20 && token.minter === address,
    isMintable: isCw20 && token.minter === address,
    isRemovable: false,
    isSendable: true,
  };
};

type TokenItem = UserTokenDetails & {
  id: string;
};

const MyWalletPage = () => {
  const chain = useChain();
  const { account, connect } = useAccount();
  const store = useStore();

  const [loading, setLoading] = useState(true);
  const [addTokenLoading, setAddTokenLoading] = useState(false);

  const [tokens, setTokens] = useState<TokenItem[]>([]);

  useEffect(() => {
    setLoading(true);
    setTokens([]);
    if (!account) {
      return;
    }
    fetch(
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
      toast("Success", {
        type: "success",
        autoClose: 2000,
      });
      updateToken(token);
    } catch (e) {
      toast(String(e), {
        type: "error",
      });
      console.log("Error when send tokens");
      console.log("error", e);
    }
  };
  const onRemove = () => {};

  return (
    <div className={styles.main}>
      <div className={styles.title}>manage assets</div>
      {!account && <Button color="green" onClick={() => connect()}>Connect</Button>}
      {account && (
      <TokenList
        addTokenLoading={addTokenLoading}
        addCw20Token={addCw20Token}
        onBurn={onBurn}
        onMint={onMint}
        onSend={onSend}
        onRemove={onRemove}
        tokens={tokens.map((token) => userTokenToListItem(token, account.address))}
      />
      )}
      {account && loading && <Triangle />}
    </div>
  );
};
export default MyWalletPage;
//   const { executeContract } = useExecuteContract({
//     contractAddress,
//     onError: (error) => {
//       console.log("error", error);
//       toast(`${error}`, {
//         type: "error",
//         autoClose: 2000,
//       });
//     },
//     onSuccess: (success) => {
//       console.log("success", success);
//       toast("Success!", {
//         type: "success",
//         autoClose: 2000,
//       });
//       refetch();
//     },
//   });
//   const fee = useFee();

//   const handleSendChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     setBalance({
//       ...balance,
//       [name]: event.target.value,
//     });
//   };

//   const handleSendTokens = () => {
//     const { recipient, amount } = balance;
//     executeContract({
//       msg: {
//         transfer: {
//           amount,
//           recipient,
//         },
//       },
//       fee,
//     });
//   };

//   const handleBurnToken = async () => {
//     executeContract({
//       msg: {
//         burn: {
//           amount: burnAmount,
//         },
//       },
//       fee,
//     });
//   };

//   const handleMintToken = async () => {
//     executeContract({
//       msg: {
//         mint: {
//           amount: mintAmount,
//           recipient: account?.bech32Address,
//         },
//       },
//       fee,
//     });
//   };

//   const fetchBalances = async (
//     {
//       clients: { stargate },
//     }: NonNullable<ReturnType<typeof useQueries>>,
//     {
//       account: { bech32Address },
//     }: NonNullable<ReturnType<typeof useWalletContext>>,
//   ) => {
//     const nativeBalances = await stargate.getAllBalances(
//       bech32Address,
//     );
//     setTokens(nativeBalances.map((balance) => ({
//       denom: balance.denom,
//       amount: balance.
//     })));
//   };

//   useEffect(() => {
//     if (!queries || !walletContext) {
//       return;
//     }
//     setLoading(true);
//     fetchBalances(queries, walletContext)
//       .finally(() => setLoading(false));
//   }, [queries, walletContext]);

//   const { sendTokens } = useSendTokens({
//     onError: (error) => {
//       toast(String(error), {
//         type: "error",
//       });
//       console.log("Error when send tokens");
//       console.log("error", error);
//     },
//     onSuccess: (result) => {
//       toast("Success", {
//         type: "success",
//         autoClose: 2000,
//       });
//       console.log("success", result);
//       fetchBalance();

//       setBalance({ recepient: "", amount: "" });
//       setOpen(false);
//     },
//   });

//   useEffect(() => {
//     fetchBalance();
//   }, [fetchBalance]);

//   // const handleSendTokens = () => {
//   //   const { recepient, amount } = balance;
//   //   if (recepient !== "" && amount !== "" && currentBalance) {
//   //     sendTokens({
//   //       recipientAddress: recepient,
//   //       amount: coins(amount, currentBalance.denom),
//   //       fee,
//   //     });
//   //   }
//   // };

//   const handleSendChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     setBalance({
//       ...balance,
//       [name]: event.target.value,
//     });
//   };

//   const addContract = () => {
//     if (userTokens.includes(newTokenAddress)) {
//       setNewTokenAddress("");
//       toast("Token already exist", {
//         type: "error",
//         autoClose: 2000,
//       });
//       return;
//     }

//     if (validateAddress(newTokenAddress, chain.bech32Config.bech32PrefixAccAddr)) {
//       addUserToken(newTokenAddress);
//       setNewTokenAddress("");
//     } else {
//       toast("Invalid contract address", {
//         type: "error",
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <div className={styles.main}>
//       <div className={styles.title}>manage assets</div>
//       <TokenList items={[]} />

//       {/* <MyInvestment />
//       <MyPools /> */}
//     </div>
//   );
// };

// export default ManageAssets;
