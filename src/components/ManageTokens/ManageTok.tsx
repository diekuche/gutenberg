import React from "react";
import styles from "./ManageTok.module.css";
import Button from "../Button/Button";
import { uuid } from "uuidv4";
import { useState, useEffect } from "react";
import { getContractInfo } from "../../utils/wallet";
import { getAddress } from "../../utils/wallet";

const contractState = {
  address: "",
  token: "",
  contractAddress: "",
  id: uuid(),
  logo: "",
  amount: "",
};

const ManageTokens = () => {
  const [contract, setContract] = useState({
    contractAddress: "",
  });

  const handleChangeContractAddress = () => (event: any) => {
    setContract({ contractAddress: event.target.value });
  };

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
        <div key={contractState.id}>
          <div className={styles.line}></div>
          <div className={styles.cashName}>
            {contractState.logo} {contractState.token}
            <div className={styles.cash}>{contractState.amount}</div>
          </div>
        </div>
        <div className={styles.inputs}>
          <input
            type="text"
            className={styles.addContract}
            value={contract.contractAddress}
            onChange={handleChangeContractAddress}
          />
        </div>
      </div>
      <Button
        color="green"
        type="button"
        size="lg"
        onClick={(e) => console.log("clicked")}
      >
        Add Token
      </Button>
    </div>
  );
};

export default ManageTokens;
