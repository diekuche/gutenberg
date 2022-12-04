import React from "react";
import styles from "./ManageTok.module.css";
import Button from "../Button/Button";
import Token from "../Token/Token";
import { useState } from "react";
import BootSender from "../BootSender/BootSender";

interface TokenProps {
  initial: string[];
  setInitial: (st: string) => void;
}

function ManageTokens(props: TokenProps) {
  const [contract, setContract] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isShown, setIsShown] = useState(false);

  function handleChangeContractAddress(event: any) {
    const response = event.target.value;
    if (response !== undefined) {
      setContract(response);
    }
  }

  function addContract() {
    setLoading(true);
    if (contract.includes("bostrom")) {
      props.setInitial(contract);
    } else {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
    setContract("");
    setLoading(false);
    setIsShown(true);
  }

  function removeContract(contract: string) {
    if (contract) {
      props.initial.filter((_contract) => _contract !== contract);
    }
  }

  return (
    <div className={styles.manageTok}>
      <div className={styles.name}>Manage Tokens</div>

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
        <div className={styles.info}>To add a token, specify its address:</div>
        {isShown && (
          <input
            type="text"
            className={styles.addContract}
            value={contract}
            onChange={handleChangeContractAddress}
          />
        )}
      </div>

      <Button
        color="green"
        type="button"
        size="lg"
        onClick={addContract}
        className={styles.addTokenButton}
      >
        {loading ? (
          <svg
            className={styles.spinner}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className={styles.path}
              cx="25"
              cy="25"
              r="20"
              stroke-width="5"
              fill="none"
            ></circle>
          </svg>
        ) : (
          "Add Token"
        )}
      </Button>

      {isVisible && <div className={styles.error}>Token not found</div>}
    </div>
  );
}

export default ManageTokens;
