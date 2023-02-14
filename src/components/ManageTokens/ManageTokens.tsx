import React from "react";
import styles from "./ManageTok.module.css";
import Button from "../Button/Button";
import Token from "../Token/Token";
import { useState } from "react";
import BootSender from "../BootSender/BootSender";
import { useAddressExists } from "../../hooks/useAddressExists";

interface TokenProps {
  initial: string[];
  setInitial: (st: string[]) => void;
}

function ManageTokens(props: TokenProps) {
  const [contract, setContract] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const { addressExists } = useAddressExists();

  function handleChangeContractAddress(event: any) {
    const response = event.target.value;
    if (response !== undefined) {
      setContract(response);
    }
  }

  function addContract() {
    if (contract.includes("bostrom")) {
      props.setInitial([...props.initial, contract]);
    } else {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
    setContract("");
    setIsShown(true);
  }

  function removeContract(contract: string) {
    if (contract) {
      const newInitial = props.initial.filter(
        (_contract) => _contract !== contract
      );
      props.setInitial(newInitial);
    }
  }

  return (
    <div className={styles.manageTok}>
      <div className={styles.highlighter}>
        <div className={styles.name}>Assets</div>
      </div>

      {addressExists ? (
        <div className={styles.tokens}>
          <BootSender></BootSender>
          <div className={styles.tokenList}>
            {props.initial.map((contract) => (
              <Token
                contractAddress={contract}
                removeContract={removeContract}
                key={contract}
              />
            ))}
          </div>
          <div className={styles.inputs}>
            <div className={styles.info}>
              To add a token, specify its address:
            </div>
            {isShown && (
              <input
                type="text"
                className={styles.addContract}
                value={contract}
                onChange={handleChangeContractAddress}
              />
            )}
            <Button
              color="green"
              type="button"
              size="lg"
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
