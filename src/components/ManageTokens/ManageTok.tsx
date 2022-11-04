import React from "react";
import styles from "./ManageTok.module.css";
import Button from "../Button/Button";
import Contract from "../Contracts/Contract";
import { useState, useEffect } from "react";

function ManageTokens() {
  const [initial, setInitial] = useState<string[]>(() => {
    const saved = localStorage.getItem("contract") as string;
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [contract, setContract] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChangeContractAddress(event: any) {
    const response = event.target.value;
    if (response) {
      setContract(response);
    }
  }

  function addContract() {
    setLoading(true);
    let _contract = contract;
    if (_contract !== undefined) {
      setInitial((st) => [...st, _contract]);
    }
    setContract("");
    setLoading(false);
  }

  useEffect(() => {
    localStorage.setItem("contract", JSON.stringify(initial));
  }, [initial]);

  return (
    <div className={styles.manageTok}>
      <div className={styles.name}>Manage Tokens</div>
      <div className={styles.cashName}>
        🟢 StBOOT
        <div className={styles.cash}>3 000 000 000</div>
      </div>
      <div className={styles.info}>
        Saint Bostrom — Blessed Bostroms for charitable deeds
      </div>
      <div className={styles.info}>
        Contract Address:
        bostrom17s7emulfygjuk0xn906athk5e5efsdtumsat5n2nad7mtrg4xresu66g83{" "}
      </div>
      <Button color="white" type="button" size="lg">
        Send
      </Button>
      <div className={styles.indent}>
        {initial.map((contract) => (
          <Contract contractAddress={contract} key={contract} />
        ))}
        <div className={styles.inputs}>
          <input
            type="text"
            className={styles.addContract}
            value={contract}
            onChange={handleChangeContractAddress}
          />
        </div>
      </div>
      <Button color="green" type="button" size="lg" onClick={addContract}>
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
    </div>
  );
}

export default ManageTokens;
