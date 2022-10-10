import { useEffect, useState } from "react";
import styles from './index.module.css';
import { getAddress} from "../../utils/wallet";


interface WalletProps {
}

const Wallet: React.FC<WalletProps> = (props: WalletProps) => {
  const [address, setAddress] = useState("");

useEffect(() => {
  async function fetchAddress() {
    let address = await getAddress();
    if (address) {
      setAddress(address);
    }
  }
  fetchAddress();
}, []);

  console.log(address);

  function handleConnect (): void {
    if (!!address) {
    return
  }
}

  return (
    <div className={styles.wallet}>
      <button className={styles.connectButton} onClick={handleConnect}>{address ? `${address.slice(0,10)}...${address.slice(-10,-5)}` : `Connect Wallet`}</button>
    </div>
  );
}
export default Wallet;