import React from "react";
import styles from "./ManageAssets.module.css";
import Button from "../Button/Button";
import Token from "./Token/Token";
import { useState } from "react";
import TokenSender from "./TokenSender/TokenSender";
import { useAccount, validateAddress } from "graz";

interface TokenProps {
  userTokens: any;
  addUserToken: (contractAddress: string) => void;
  removeUserToken: (contractAddress: string) => void;
}

function ManageTokens({
  userTokens,
  addUserToken,
  removeUserToken,
}: TokenProps) {
  const [contract, setContract] = useState("");
  const [isVisible, setVisible] = useState(false);
  const { data: account, isConnected } = useAccount();
  const currentTokens = userTokens[account?.bech32Address!] || [];
  const chainPrefix: any = account?.bech32Address?.slice(0, 4);

  function handleChangeContractAddress(event: any) {
    const response = event.target.value;
    if (response !== undefined) {
      setContract(response);
    }
  }

  function addContract() {
    if (validateAddress(contract, chainPrefix)) {
      addUserToken(contract);
      setContract("");
    } else {
      alert("Invalid contract address");
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
                key={contract}
              />
            ))}
          </div>
          <div className={styles.inputs}>
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
