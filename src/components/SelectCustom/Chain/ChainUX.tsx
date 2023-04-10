import React from "react";
import styles from "./ChainUX.module.css";
import circle from "../../../assets/circle.svg";

export interface ChainProps {
  chainName: string;
  icon?: string;
}

const ChainUX: React.FC<ChainProps> = ({ chainName, icon = circle }) => {
  return (
    <div className={styles.chain}>
      <img className={styles.icon} src={icon} alt={`${chainName} logo`} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{chainName}</div>
      </div>
    </div>
  );
};

export default ChainUX;
