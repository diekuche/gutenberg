import Button from "../Button/Button";
import styles from "./Wallet.module.css";
import { useAccount, useConnect, useDisconnect } from "graz";

const Wallet: React.FC = () => {
  const { connect } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const connectWallet = () => {
    console.log("connect");
    try {
      isConnected ? disconnect() : connect();
    } catch (err) {
      console.log("err", err);
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
