import Button from "../Button/Button";
import styles from "./Wallet.module.css";
import { useAccount, useConnect, useDisconnect } from "graz";

const Wallet: React.FC = () => {
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const connectWallet = () => {
    isConnected ? disconnect() : connect();
  };

  return (
    <Button
      color="white"
      className={`${styles.wallet} ${account ? styles.connected : ""}`}
      onClick={connectWallet}
    >
      <div className={styles.address}>
        {account
          ? `${account.bech32Address.slice(
              0,
              10
            )}...${account.bech32Address.slice(-10, -5)}`
          : "Connect Wallet"}
      </div>
    </Button>
  );
};
export default Wallet;
