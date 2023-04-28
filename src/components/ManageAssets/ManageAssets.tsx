import React from "react";
import styles from "./ManageAssets.module.css";
import Button from "../Button/Button";
import Token from "./OtherTokenSender/OtherTokenSender";
import { useState } from "react";
import TokenSender from "./NativeTokenSender/NativeTokenSender";
import { useAccount, useActiveChain } from "graz";
import { toast } from "react-toastify";
import { validateAddress } from "../../utils/config";

interface TokenProps {
  userTokens: any;
  addUserToken: (contractAddress: string) => void;
  removeUserToken: (contractAddress: string) => void;
}

const getPrefix = (chainId: string) => {
  switch (chainId) {
    case "juno-1": {
      return "juno";
    }
    case "pion-1": {
      return "neutron";
    }
    default: {
      return chainId;
    }
  }
};

function ManageTokens({
  userTokens,
  addUserToken,
  removeUserToken,
}: TokenProps) {
  const [contract, setContract] = useState("");
  const [isVisible, setVisible] = useState(false);
  const { data: account, isConnected } = useAccount();
  const activeChain = useActiveChain();
  const currentTokens = userTokens[account?.bech32Address!] || [];
  const [open, setOpen] = useState(false);

  function handleChangeContractAddress(event: any) {
    const response = event.target.value;
    if (response !== undefined) {
      setContract(response);
    }
  }

  function addContract() {
    if (currentTokens.includes(contract)) {
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
            {currentTokens.map((contractAddress: any) => (
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
