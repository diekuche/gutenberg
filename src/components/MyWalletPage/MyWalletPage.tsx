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
import styles from "./MyWalletPage.module.css";

const fetch = async (
  chain: Chain,
  account: Account,
  store: QueryCache,
  pushTokens: (tokens: TokenListItem[]) => void,
) => {
  const bank = await chain.bank();
  const balances = await bank.allBalances(account.address);

  const userCw20Tokens = await store.get(STORE_USER_CW20_TOKENS_KEY(chain, account));

  await Promise.all(balances.map(async (balance) => {
    const isFactoryToken = balance.denom.toLowerCase().startsWith("factory/");
    if (isFactoryToken) {
      const meta = await bank.denomMetadata(balance.denom);
      pushTokens([{
        shortName: getShortTokenName(balance.denom),
        key: balance.denom,
        logoUrl: "",
        userBalance: BigNumber(balance.amount).dividedBy(10 ** meta.denomUnits[0].exponent),
        isBurnable: true,
        isMintable: true,
        isRemovable: false,
        isSendable: true,
      }]);
      return;
    }
    const native = chain.config.currencies.find((currency) => currency.coinMinimalDenom
    === balance.denom);
    if (native) {
      pushTokens([{
        shortName: balance.denom,
        key: balance.denom,
        logoUrl: native.coinImageUrl || "",
        userBalance: BigNumber(balance.amount).dividedBy(10 ** native.coinDecimals),
        isBurnable: false,
        isMintable: false,
        isRemovable: false,
        isSendable: true,
      }]);
    }
  }).concat(userCw20Tokens.map(async (tokenAddress) => {
    const token = await chain.query(CW20_USER_TOKEN_DETAILS(tokenAddress, account.address));
    pushTokens([{
      shortName: token.name,
      key: `cw20:${tokenAddress}`,
      logoUrl: token.logo || "",
      userBalance: BigNumber(token.balance).dividedBy(10 ** token.decimals),
      isBurnable: token.minter === account.address,
      isMintable: token.minter === account.address,
      isRemovable: false,
      isSendable: true,
    }]);
  })));
};

const MyWalletPage = () => {
  const chain = useChain();
  const { account } = useAccount();
  const store = useStore();

  const [loading, setLoading] = useState(true);
  const [addTokenLoading, setAddTokenLoading] = useState(false);

  const [tokens, setTokens] = useState<TokenListItem[]>([]);

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
          (oldToken) => !newTokens.find((newToken) => newToken.key === oldToken.key),
        ).concat(newTokens));
      },
    ).finally(() => setLoading(false));
  }, [account, chain]);

  const addCw20Token = (tokenAddress: string) => {
    if (!chain.validateAddress(tokenAddress)) {
      toast.error("Invalid token address");
      return;
    }
    if (tokens.find((token) => token.key === tokenAddress)) {
      toast.error("Token already exists");
      return;
    }
    setAddTokenLoading(true);
  };

  const checkAccount = () => {
    if (!account) {
      toast.error("Account is not connected");
      throw new Error("Account is not connected");
    }
    return account;
  };

  const onBurn = () => {};
  const onMint = () => {};
  const onSend = async (key: string, recipient: string, amount: string) => {
    if (!account) {
      toast.error("Account is not connected");
      return;
    }
    const { signer } = checkAccount();
    if (!chain.validateAddress(recipient)) {
      toast.error("Invalid recipient");
      return;
    }

    const signingCosmWasmClient = await chain.getSigningCosmWasmClient(signer);
    if (key.startsWith("cw20:")) {
      const contractAddress = key.substring(5);
      await new Cw20Client(signingCosmWasmClient, account.address, contractAddress).send({
        amount,
        contract: recipient,
        msg: "",
      }, chain.calculateFee(GasLimit.Cw20Send));
    } else {
      (await chain.getSigningCosmWasmClient(account.signer)).sendTokens(
        account.address,
        recipient,
        [{
          denom: key,
          amount,
        }],
        chain.calculateFee(GasLimit.NativeSendTokens),
      );
    }
  };
  const onRemove = () => {};

  return (
    <div className={styles.main}>
      <div className={styles.title}>manage assets</div>
      <TokenList
        addTokenLoading={addTokenLoading}
        addCw20Token={addCw20Token}
        onBurn={onBurn}
        onMint={onMint}
        onSend={onSend}
        onRemove={onRemove}
        tokens={tokens}
      />
      {loading && <Triangle />}
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
