import { useAccount, useConnect, useDisconnect } from "graz";
import styles from './index.module.css';

function Wallet() {
  const { connect } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  function handleConnect() {
    return isConnected ? disconnect() : connect();
  }

  return (
    <div className={styles.wallet}>
      <button className={styles.connectButton} onClick={handleConnect}>{account && isConnected ? `${account.bech32Address}` : "Connect Wallet"}</button>
    </div>
  );
}

export default Wallet