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
