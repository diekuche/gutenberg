import React, { useContext } from "react";
import styles from "./ManageAssets.module.css";
import Button from "../Button/Button";
import Token from "./OtherTokenSender/OtherTokenSender";
import { useState } from "react";
import TokenSender from "./NativeTokenSender/NativeTokenSender";
import { useAccount, useActiveChain, validateAddress } from "graz";
import { toast } from "react-toastify";
import { AppStateContext } from "../../context/AppStateContext";

export const getPrefix = (chainId: string) => {
  switch (chainId) {
    case "juno-1": {
      return "juno";
    }
    default: {
      return chainId;
    }
  }
};

function ManageTokens() {
  const [contract, setContract] = useState("");
  const [isVisible, setVisible] = useState(false);
  const { isConnected } = useAccount();
  const activeChain = useActiveChain();
  const [open, setOpen] = useState(false);
  const { addUserToken, userTokens, removeUserToken } =
    useContext(AppStateContext);

  function handleChangeContractAddress(event: any) {
    const response = event.target.value;
    if (response !== undefined) {
      setContract(response);
    }
  }

  function addContract() {
    if (userTokens.includes(contract)) {
      setContract("");
      return toast("Token already exist", {
        type: "error",
        autoClose: 2000,
      });
    }

    if (validateAddress(contract, getPrefix(activeChain!.chainId))) {
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
              <Token
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
                  To add a token, specify it is address:
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
                  onClick={addContract}
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
          Please connect your wallet <br></br> to view your active positions.
        </div>
      )}
    </div>
  );
}

export default ManageTokens;
