import React from "react";
import styles from "./Contract.module.css";
import { IContract } from "../../models";

interface ContractProps {
  contract: IContract;
}

export function Contract({ contract }: ContractProps) {
  return (
    <div>
      <div className={styles.line}></div>
      <div className={styles.cashName}>
        {contract.logo} {contract.token}
        <div className={styles.cash}>{contract.amount}</div>
      </div>
    </div>
  );
}

export default Contract;
