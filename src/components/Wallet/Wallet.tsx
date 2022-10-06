import { useEffect } from "react";
import styles from './index.module.css';
import { getAddress} from "../../utils/wallet";

export interface WalletProps {
  address: string;
  isConnected: boolean;
} 


const fetchAddress = async () => {
  const address = await getAddress();
  console.log("address", address);
};


useEffect(() => {
  fetchAddress();
}, []);

function handleConnect() {
  const isConnected = false;

  function connect () {
    
  
  }
  
  function disconnect () {
  
  }
  return isConnected ? connect() : disconnect();
}



function Wallet(props: WalletProps) {

  const isConnected = false;

  const address = useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className={styles.wallet}>
      <button className={styles.connectButton} onClick={handleConnect}>{address && isConnected ? `${address.slice(0,10)}...${address.bech32Address.slice(-10,-5)}` : "Connect Wallet"}</button>
    </div>
  );
}

export default Wallet