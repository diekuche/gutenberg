import TokenList, { TokenListItem } from "ui/MyWalletPage/TokenList";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useChain } from "hooks/useChain";
import { ChainConfig } from "config/chains";
import { QueryClient, setupBankExtension } from "@cosmjs/stargate";
import { getShortTokenName } from "utils/tokens";
import BigNumber from "bignumber.js";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import withError from "with-error";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { QueryCache } from "utils/QueryCache";
import { CW20_USER_TOKEN_DETAILS } from "hooks/useQueries";
import styles from "./MyWalletPage.module.css";

const fetch = async (
  chain: ChainConfig,
  pushTokens: (tokens: TokenListItem[]) => void,
) => {
  if (!window.keplr) {
    throw new Error("Wallet is not connected");
  }
  const signer = window.keplr.getOfflineSigner(chain.chainId);
  const accounts = await signer.getAccounts();
  const account = accounts[0];
  const tendermint = await Tendermint34Client.connect(chain.rpc);
  // const stargate = await StargateClient.create(tendermint);
  const queryClient = new QueryClient(tendermint);
  const { bank } = setupBankExtension(queryClient);
  const cosmwasm = await CosmWasmClient.create(tendermint);
  const cache = new QueryCache({});
  // const balances = await stargate.getAllBalances(account.address);
  const balances = await bank.allBalances(account.address);

  // const tokenFactoryDenoms = //

  const cw20SavedTokensRaw = localStorage.getItem("userTokens");
  const [cw20SavedTokens] = withError(() => JSON.parse(cw20SavedTokensRaw || "") as Record<string, string[]>);
  const userCw20Tokens = cw20SavedTokens && cw20SavedTokens[account.address]
    ? cw20SavedTokens[account.address] : [];
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

    const native = chain.currencies.find((currency) => currency.coinDenom === balance.denom);
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
    const token = await cache.getOrUpdate(CW20_USER_TOKEN_DETAILS(tokenAddress, account.address), {
      cache,
      cosmwasm,
    });
    pushTokens([{
      shortName: token.name,
      key: tokenAddress,
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

  const [loading, setLoading] = useState(true);

  const [tokens, setTokens] = useState<TokenListItem[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(chain, (newTokens) => {
      setTokens((oldTokens) => oldTokens.filter(
        (oldToken) => !newTokens.find((newToken) => newToken.key === oldToken.key),
      ).concat(newTokens));
    }).finally(() => setLoading(false));
  }, [chain]);

  const addCw20Token = () => {};
  const onBurn = () => {};
  const onMint = () => {};
  const onSend = () => {};
  const onRemove = () => {};

  return (
    <div className={styles.main}>
      <div className={styles.title}>manage assets</div>
      <TokenList
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

// import React, {
//   useCallback, useContext, useEffect, useState,
// } from "react";
// import { Coin, coins } from "@cosmjs/stargate";
// import {
//   useAccount,
//   useClients,
//   useSendTokens,
// } from "graz";
// import { toast } from "react-toastify";
// import Button from "ui/Button";
// import { getShortTokenName } from "utils/tokens";
// import TokenList, { TokenListItem } from "ui/MyWalletPage/TokenList";
// import { useQueries } from "hooks/useQueries";
// import { useWalletContext } from "hooks/useWalletContext";
// import styles from "./MyWallet.module.css";
// import circle from "../../assets/circle.svg";
// import swapMA from "../../assets/swapMA.svg";
// import icon_send from "../../assets/icon_send.svg";
// import icon_mint from "../../assets/icon_mint.svg";
// import icon_burn from "../../assets/icon_burn.svg";
// // import MyInvestment from "../Pools/MyInvestment/MyInvestment";
// // import MyPools from "../Pools/MyPools/MyPools";
// import { AppStateContext } from "../../context/AppStateContext";
// import Token from "./Token/Token";
// import { useFee } from "../../utils/useFee";
// import { useChain } from "../../hooks/useChain";
// import { validateAddress } from "../../utils/wallet";

// // const sendBalance = {
// //   recepient: "",
// //   amount: "",
// // };

// // const ManageAssets = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [tokens, setTokens] = useState<TokenListItem[]>([]);
// //   const [newTokenAddress, setNewTokenAddress] = useState("");
// //   const [open, setOpen] = useState(false);
// //   const [token, setToken] = useState(false);
// //   const [balance, setBalance] = useState<typeof sendBalance>(sendBalance);
// //   const { data: account } = useAccount();
// //   const { data } = useClients();
// //   const client = data?.stargate;
// //   const [currentBalances, setCurrentBalances] = useState<readonly Coin[]>([]);
// //   const { userTokens, removeUserToken, addUserToken } = useContext(AppStateContext);
// //   const fee = useFee();

// //   const chain = useChain();
// //   const queries = useQueries();
// //   const walletContext = useWalletContext();

// //   const { data: account } = useAccount();
// //   const { data: tokenBalance, refetch } = useQuerySmart<BalanceResponse, string>(
// //     contractAddress,
// //     {
// //       balance: { address: account?.bech32Address },
// //     },
// //   );
// //   const { data: tokenInfo } = useQuerySmart<TokenInfoResponse, string>(contractAddress, {
// //     token_info: {},
// //   });
// //   const { data: marketingInfo } = useQuerySmart<MarketingInfoResponse, string>(contractAddress, {
// //     marketing_info: {},
// //   });
// //   const logoId = marketingInfo?.logo === "embedded" ? marketingInfo?.logo : marketingInfo?.logo?.url?.match(/d\/(.+)\//)?.[1];
// //   const logoUrl = logoId && `https://drive.google.com/uc?id=${logoId}`;
// //   const { executeContract } = useExecuteContract({
// //     contractAddress,
// //     onError: (error) => {
// //       console.log("error", error);
// //       toast(`${error}`, {
// //         type: "error",
// //         autoClose: 2000,
// //       });
// //     },
// //     onSuccess: (success) => {
// //       console.log("success", success);
// //       toast("Success!", {
// //         type: "success",
// //         autoClose: 2000,
// //       });
// //       refetch();
// //     },
// //   });
// //   const fee = useFee();

// //   const handleSendChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setBalance({
// //       ...balance,
// //       [name]: event.target.value,
// //     });
// //   };

// //   const handleSendTokens = () => {
// //     const { recipient, amount } = balance;
// //     executeContract({
// //       msg: {
// //         transfer: {
// //           amount,
// //           recipient,
// //         },
// //       },
// //       fee,
// //     });
// //   };

// //   const handleBurnToken = async () => {
// //     executeContract({
// //       msg: {
// //         burn: {
// //           amount: burnAmount,
// //         },
// //       },
// //       fee,
// //     });
// //   };

// //   const handleMintToken = async () => {
// //     executeContract({
// //       msg: {
// //         mint: {
// //           amount: mintAmount,
// //           recipient: account?.bech32Address,
// //         },
// //       },
// //       fee,
// //     });
// //   };

// //   const fetchBalances = async (
// //     {
// //       clients: { stargate },
// //     }: NonNullable<ReturnType<typeof useQueries>>,
// //     {
// //       account: { bech32Address },
// //     }: NonNullable<ReturnType<typeof useWalletContext>>,
// //   ) => {
// //     const nativeBalances = await stargate.getAllBalances(
// //       bech32Address,
// //     );
// //     setTokens(nativeBalances.map((balance) => ({
// //       denom: balance.denom,
// //       amount: balance.
// //     })));
// //   };

// //   useEffect(() => {
// //     if (!queries || !walletContext) {
// //       return;
// //     }
// //     setLoading(true);
// //     fetchBalances(queries, walletContext)
// //       .finally(() => setLoading(false));
// //   }, [queries, walletContext]);

// //   const { sendTokens } = useSendTokens({
// //     onError: (error) => {
// //       toast(String(error), {
// //         type: "error",
// //       });
// //       console.log("Error when send tokens");
// //       console.log("error", error);
// //     },
// //     onSuccess: (result) => {
// //       toast("Success", {
// //         type: "success",
// //         autoClose: 2000,
// //       });
// //       console.log("success", result);
// //       fetchBalance();

// //       setBalance({ recepient: "", amount: "" });
// //       setOpen(false);
// //     },
// //   });

// //   useEffect(() => {
// //     fetchBalance();
// //   }, [fetchBalance]);

// //   // const handleSendTokens = () => {
// //   //   const { recepient, amount } = balance;
// //   //   if (recepient !== "" && amount !== "" && currentBalance) {
// //   //     sendTokens({
// //   //       recipientAddress: recepient,
// //   //       amount: coins(amount, currentBalance.denom),
// //   //       fee,
// //   //     });
// //   //   }
// //   // };

// //   const handleSendChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setBalance({
// //       ...balance,
// //       [name]: event.target.value,
// //     });
// //   };

// //   const addContract = () => {
// //     if (userTokens.includes(newTokenAddress)) {
// //       setNewTokenAddress("");
// //       toast("Token already exist", {
// //         type: "error",
// //         autoClose: 2000,
// //       });
// //       return;
// //     }

// //     if (validateAddress(newTokenAddress, chain.bech32Config.bech32PrefixAccAddr)) {
// //       addUserToken(newTokenAddress);
// //       setNewTokenAddress("");
// //     } else {
// //       toast("Invalid contract address", {
// //         type: "error",
// //         autoClose: 2000,
// //       });
// //     }
// //   };

// //   return (
// //     <div className={styles.main}>
// //       <div className={styles.title}>manage assets</div>
// //       <TokenList items={[]} />

// //       {/* <MyInvestment />
// //       <MyPools /> */}
// //     </div>
// //   );
// // };

// // export default ManageAssets;
