import { useEffect, useState } from "react";
import { getAddress, getDisconnected } from "../../utils/wallet";
import { configKeplr, CYBER } from "../../utils/config";
import Button from "../Button/Button";
import styles from "./Wallet.module.css";
import classNames from "classnames";


const Wallet: React.FC = () => {
  const [address, setAddress] = useState("");
  const [connectedAddress, setAddressConnected] = useState(
    `${address.slice(0, 10)}...${address.slice(-10, -5)}`
  );
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
  };

  useEffect(() => {
    initKeplr();
    fetchAddress();
  }, []);

  function MouseOver() {
    if (address) {
      setAddressConnected(`disconnect`);
      setDisconnect(true);
    }

  }
  function MouseOut() {
    setAddressConnected(`${address.slice(0, 10)}...${address.slice(-10, -5)}`);
    setDisconnect(false)
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
        {address ? connectedAddress : `Connect Wallet`}
      </Button>
    </div>
  );
};
export default Wallet;