import { useEffect, useState } from "react";
import { getAddress } from "../../utils/wallet";
import { configKeplr, CYBER } from "../../utils/config";
import Button from "../Button/Button";

const Wallet: React.FC = () => {
  const [address, setAddress] = useState("");

  const initKeplr = async () => {
    if (window.keplr) {
      await window.keplr.experimentalSuggestChain(configKeplr("bostrom"));
      await window.keplr.enable(CYBER.CHAIN_ID);
    }
  };

  const handleConnect = () => {
    if (!address) {
      initKeplr();
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

  return (
    <div>
      <Button color="white" onClick={handleConnect}>
        {address
          ? `${address.slice(0, 10)}...${address.slice(-10, -5)}`
          : `Connect Wallet`}
      </Button>
    </div>
  );
};
export default Wallet;
