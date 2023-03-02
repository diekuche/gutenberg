import React from "react";
import styles from "./Shit.module.css";
import circle from "../../../assets/shit_logo.svg";

const Shit = () => {
  return (
    <div className={styles.boot}>
      <div>
        <img className={styles.circle} src={circle} alt="shit_logo" />
      </div>
      <div>
        <p className={styles.name}>Shit</p>
        <p className={styles.chainName}>Shitcoin</p>
      </div>
      <div className={styles.wrapperBalance}>
        <p className={styles.balance}>4</p>
      </div>
    </div>
  );
};

export default Shit;
