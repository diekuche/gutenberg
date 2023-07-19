import TokenList from "ui/MyWalletPage/TokenList";
import { Triangle } from "react-loader-spinner";
import { useAccount } from "hooks/useAccount";
import Button from "ui/Button";
import { useUserTokens } from "hooks/useUserTokens";
import styles from "./MyWalletPage.module.css";

const MyWalletPage = () => {
  const { account, connect } = useAccount();
  const {
    addTokenLoading,
    addCw20Token,
    onBurn,
    onDelete,
    loading,
    onMint,
    onSend,
    tokens,
  } = useUserTokens();

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
        onRemove={onDelete}
        tokens={tokens}
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
