import React from "react";
import styles from "./Pig.module.css";
import circle from "../../../assets/pig_logo.svg";

const Pig = () => {
  return (
    <div className={styles.boot}>
      <div>
        <img className={styles.circle} src={circle} alt="pig_logo" />
      </div>
      <div>
        <p className={styles.name}>Pig</p>
        <p className={styles.chainName}>PigNoN</p>
      </div>
      <div className={styles.wrapperBalance}>
        <p className={styles.balance}>2,901</p>
      </div>
    </div>
  );
};

export default Pig;
