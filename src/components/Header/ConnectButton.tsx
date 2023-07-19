import Button from "ui/Button";
import styles from "./ConnectButton.module.css";

type ConnectButtonProps = {
  address?: string;
  connect: () => void;
  disconnect: () => void;
};

const ConnectButton = ({
  address,
  connect,
  disconnect,
}: ConnectButtonProps) => {
  const connectWallet = () => {
    if (address) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <Button
      color="white"
      className={`${styles.wallet} ${address ? styles.connected : ""}`}
      onClick={connectWallet}
    >
      <div className={styles.address}>
        {address
          ? `${address.slice(
            0,
            10,
          )}...${address.slice(-10, -5)}`
          : "Connect Wallet"}
      </div>
    </Button>
  );
};
export default ConnectButton;
