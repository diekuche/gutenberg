import React from "react";
import styles from "./TokenUI.module.css";

interface TokenProps {
  name: string;
  chainName: string;
  balance: string;
  icon: string;
}

const TokenUI: React.FC<TokenProps> = ({
  name, chainName, balance, icon,
}) => (
  <div className={styles.token}>
    <div>
      <img className={styles.icon} src={icon} alt={`${name} logo`} />
    </div>
    <div className={styles.nameWrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.chainName}>{chainName}</div>
    </div>
    <div className={styles.balanceWrapper}>
      <div className={styles.balance}>{balance}</div>
    </div>
  </div>
);

export default TokenUI;
