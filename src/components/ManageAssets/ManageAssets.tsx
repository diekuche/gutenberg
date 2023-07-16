import { ChangeEventHandler, useContext, useState } from "react";
import { useAccount } from "graz";
import { toast } from "react-toastify";
import Button from "ui/Button";
import styles from "./ManageAssets.module.css";
import OtherTokenSender from "./OtherTokenSender/OtherTokenSender";
import TokenSender from "./NativeTokenSender/NativeTokenSender";
import { AppStateContext } from "../../context/AppStateContext";
import { useChain } from "../../hooks/useChain";
import { validateAddress } from "../../utils/wallet";

function ManageTokens() {
  const [contract, setContract] = useState("");
  const [isVisible, setVisible] = useState(false);
  const chain = useChain();
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const { addUserToken, userTokens, removeUserToken } = useContext(AppStateContext);

  const handleChangeContractAddress: ChangeEventHandler<HTMLInputElement> = (event) => {
    const response = event.target.value;
    if (response) {
      setContract(response);
    }
  };

  function addContract() {
    if (userTokens.includes(contract)) {
      setContract("");
      toast("Token already exist", {
        type: "error",
        autoClose: 2000,
      });
      return;
    }

    if (validateAddress(contract, chain.bech32Config.bech32PrefixAccAddr)) {
      addUserToken(contract);
      setContract("");
    } else {
      toast("Invalid contract address", {
        type: "error",
        autoClose: 2000,
      });
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  }

  return (
    <div className={styles.manageTok}>
      <div className={styles.highlighter}>
        <div className={styles.name}>Assets</div>
      </div>

      {isConnected ? (
        <div className={styles.tokens}>
          <TokenSender />
          <div className={styles.tokenList}>
            {userTokens.map((contractAddress) => (
              <OtherTokenSender
                contractAddress={contractAddress}
                removeContract={removeUserToken}
                key={contractAddress}
              />
            ))}
          </div>
          <div className={styles.inputs}>
            <div className={styles.test} onClick={() => setOpen(!open)}>
              {open ? "" : "add token"}
            </div>
            {open && (
              <div>
                <div className={styles.info}>
                  To add a token, specify its address:
                </div>
                <input
                  type="text"
                  className={styles.addContract}
                  value={contract}
                  onChange={handleChangeContractAddress}
                />
                <Button
                  color="green"
                  type="button"
                  onClick={() => addContract()}
                  className={styles.addTokenButton}
                >
                  Add Token
                </Button>
              </div>
            )}
            {isVisible && <div className={styles.error}>Token not found</div>}
          </div>
        </div>
      ) : (
        <div className={styles.info2}>
          Please connect your wallet
          {" "}
          <br />
          {" "}
          to view your active positions.
        </div>
      )}
    </div>
  );
}

export default ManageTokens;
