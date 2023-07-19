import Button from "ui/Button";
import { useAccount } from "hooks/useAccount";
import styles from "./ConnectButton.module.css";

const ConnectButton: React.FC = () => {
  const {
    account, connect, disconnect, isConnected,
  } = useAccount();
  const connectWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Button
      color="white"
      className={`${styles.wallet} ${isConnected ? styles.connected : ""}`}
      onClick={connectWallet}
    >
      <div className={styles.address}>
        {isConnected
          ? `${account?.address.slice(
            0,
            10,
          )}...${account?.address.slice(-10, -5)}`
          : "Connect Wallet"}
      </div>
    </Button>
  );
};
export default ConnectButton;
