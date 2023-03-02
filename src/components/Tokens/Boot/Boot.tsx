import React from "react";
import styles from "./Boot.module.css";
import circle from "../../../assets/boot_logo.svg";

const Boot = () => {
  return (
    <div className={styles.boot}>
      <div>
        <img className={styles.circle} src={circle} alt="boot_logo" />
      </div>
      <div>
        <p className={styles.name}>BOOT</p>
        <p className={styles.chainName}>Bostrom</p>
      </div>
      <div className={styles.wrapperBalance}>
        <p className={styles.balance}>200,300,765</p>
      </div>
    </div>
  );
};

export default Boot;
