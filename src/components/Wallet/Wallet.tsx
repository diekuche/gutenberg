import { useEffect, useState } from "react";
import { getAddress, getDisconnected } from "../../utils/wallet";
import { configKeplr, CYBER } from "../../utils/config";
import Button from "../Button/Button";

const Wallet: React.FC = () => {
  const [address, setAddress] = useState("");
  const [connect, setDisconnect] = useState(
    `${address.slice(0, 10)}...${address.slice(-10, -5)}` || `disconnect`
  );

  const initKeplr = async () => {
    if (window.keplr) {
      await window.keplr.experimentalSuggestChain(configKeplr("bostrom"));
      await window.keplr.enable(CYBER.CHAIN_ID);
    }
  };

  const handleConnect = () => {
    if (!address) {
      initKeplr();
    } else if (address) {
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

  function MouseOver(event: any) {
    event.target.style.background = "red";
    setDisconnect(`disconnect`);
  }
  function MouseOut(event: any) {
    event.target.style.background = "";
    setDisconnect(`${address.slice(0, 10)}...${address.slice(-10, -5)}`);
  }

  return (
    <div>
      <Button
        color="white"
        onClick={handleConnect}
        onMouseOver={MouseOver}
        onMouseOut={MouseOut}
      >
        {address ? connect : `Connect Wallet`}
      </Button>
    </div>
  );
};
export default Wallet;
