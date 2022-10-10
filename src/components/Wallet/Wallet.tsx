import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { getAddress } from "../../utils/wallet";

const Wallet: React.FC = () => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function fetchAddress() {
      let response = await getAddress();
      if (response) {
        setAddress(response);
      }
    }
    fetchAddress();
  }, []);

  return (
    <div className={styles.wallet}>
      <button className={styles.connectButton}>
        {address
          ? `${address.slice(0, 10)}...${address.slice(-10, -5)}`
          : `Connect Wallet`}
      </button>
    </div>
  );
};
export default Wallet;
