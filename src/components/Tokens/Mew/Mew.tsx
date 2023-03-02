import React from "react";
import styles from "./Mew.module.css";
import circle from "../../../assets/mew_logo.svg";

const Mew = () => {
  return (
    <div className={styles.boot}>
      <div>
        <img className={styles.circle} src={circle} alt="mew_logo" />
      </div>
      <div>
        <p className={styles.name}>Mew</p>
        <p className={styles.chainName}>Mew Mew Paw Paw Rrrrr</p>
      </div>
      <div className={styles.wrapperBalance}>
        <p className={styles.balance}>194,34</p>
      </div>
    </div>
  );
};

export default Mew;
