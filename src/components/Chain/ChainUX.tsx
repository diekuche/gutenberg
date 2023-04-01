import React from "react";
import styles from "./ChainUX.module.css";

interface ChainProps {
  chainName: string;
  icon: string;
}

const TokenUI: React.FC<ChainProps> = ({ chainName, icon }) => {
  return (
    <div className={styles.token}>
      <img className={styles.icon} src={icon} alt={`${chainName} logo`} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{chainName}</div>
      </div>
    </div>
  );
};

export default TokenUI;
