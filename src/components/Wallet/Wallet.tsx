import { useEffect } from "react";
import styles from './index.module.css';
import { getAddress} from "../../utils/wallet";

export interface WalletProps {
  address: string;
  isConnected: boolean;
} 

function Wallet(props: WalletProps) {

  const { address="", isConnected = false} = props;

  const fetchAddress = async () => {
    const address = await getAddress();
    console.log("address", address);
  };


  useEffect(() => {
    fetchAddress();
  }, []);

  function handleConnect() {
    return isConnected ? disconnect() : connect();
  }

  function disconnect () {

  }

  function connect () {
    
  }


  return (
    <div className={styles.wallet}>
      <button className={styles.connectButton} onClick={handleConnect}>{address && isConnected ? `${address.slice(0,10)}...${address.bech32Address.slice(-10,-5)}` : "Connect Wallet"}</button>
    </div>
  );
}

export default Wallet