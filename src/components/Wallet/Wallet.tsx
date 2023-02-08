import { useEffect, useState } from "react";
import { getAddress, getDisconnected } from "../../utils/wallet";
import Button from "../Button/Button";
import styles from "./Wallet.module.css";
import { useAddressExists } from "../../hooks/useAddressExists";
/*import classNames from "classnames";*/

const Wallet: React.FC = () => {
  const [address, setAddress] = useState("");
  /*const [disconnect, setDisconnect] = useState(false);*/

  const { initKeplr } = useAddressExists();

  const fetchAddress = async () => {
    let response = await getAddress();
    if (response) {
      setAddress(response);
    }
  };

  useEffect(() => {
    initKeplr();
    fetchAddress();
    const interval = setInterval(() => fetchAddress(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [initKeplr]);

  const handleConnect = () => {
    if (!address) {
      initKeplr();
    } else {
      getDisconnected();
    }
  };

  /*function MouseOver() {
    if (address) {
      setDisconnect(true);
    }
  }
  function MouseOut() {
    setDisconnect(false);
  }*/

  return (
    <div>
      <Button
        color="white"
        /*className={classNames({
          [styles.disconnect]: disconnect,
        })}*/
        className={styles.wallet}
        onClick={handleConnect}
        /* onMouseOver={MouseOver}
        onMouseOut={MouseOut}*/
      >
        {address
          ? `${address.slice(0, 10)}...${address.slice(-10, -5)}`
          : "Connect Wallet"}
      </Button>
    </div>
  );
};
export default Wallet;
