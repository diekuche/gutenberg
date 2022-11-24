import { useEffect, useState } from "react";
import { getAddress, getDisconnected } from "../../utils/wallet";
import { configKeplr, CYBER } from "../../utils/config";
import Button from "../Button/Button";
import styles from "./Wallet.module.css";
import classNames from "classnames";

const Wallet: React.FC = () => {
  const [address, setAddress] = useState("");
  const [disconnect, setDisconnect] = useState(false);

  const initKeplr = async () => {
    if (window.keplr) {
      await window.keplr.experimentalSuggestChain(configKeplr("bostrom"));
      await window.keplr.enable(CYBER.CHAIN_ID);
    }
  };

  const handleConnect = () => {
    if (!address) {
      initKeplr();
    } else {
      getDisconnected();
    }
  };

  const fetchAddress = async () => {
    let response = await getAddress();
    if (response) {
      setAddress(response);
    }
    if (address) {
    }
  };

  useEffect(() => {
    initKeplr();
    fetchAddress();
  }, []);

  function MouseOver() {
    if (address) {
      setDisconnect(true);
    }
  }
  function MouseOut() {
    setDisconnect(false);
  }

  return (
    <div>
      <Button
        className={classNames(styles.whiteButton, {
          [styles.disconnect]: disconnect === true,
          [styles.whiteButton]: disconnect === false,
        })}
        onClick={handleConnect}
        onMouseOver={MouseOver}
        onMouseOut={MouseOut}
      >
        {address && disconnect === false
          ? `${address.slice(0, 10)}...${address.slice(-10, -5)}`
          : disconnect === true
          ? "disconnect"
          : `Connect Wallet`}
      </Button>
    </div>
  );
};
export default Wallet;
