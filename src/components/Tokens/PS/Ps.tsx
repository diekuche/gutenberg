import React from "react";
import styles from "./Ps.module.css";
import circle from "../../../assets/ps_logo.svg";

const Ps = () => {
  return (
    <div className={styles.boot}>
        <div>
            <img className={styles.circle} src={circle} alt="ps_logo" />
        </div>
        <div>
            <p className={styles.name}>Ps</p>
            <p className={styles.chainName}>Bostrom</p>
        </div>
        <div className={styles.wrapperBalance}>
            <p className={styles.balance}>0</p>
        </div>
    </div>
  );
};

export default Ps;