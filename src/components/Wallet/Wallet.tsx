import { initKeplr } from "../../utils/wallet";
import Button from "../Button/Button";
import styles from "./Wallet.module.css";
import { useAccount, useConnect, useDisconnect } from "graz";

const Wallet: React.FC = () => {
  const { data: account, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = () => {
    if (isConnected) {
      disconnect();
    } else {
      initKeplr();
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
          ? `${account?.bech32Address.slice(
              0,
              10
            )}...${account?.bech32Address.slice(-10, -5)}`
          : "Connect Wallet"}
      </div>
    </Button>
  );
};
export default Wallet;
