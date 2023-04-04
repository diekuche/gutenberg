import React from "react";
import styles from "../NTT/NTT.module.css";
import imprint from "../../assets/nttcs.svg";

const NTT = () => {
  return (
    <div className={styles.ntt}>
      <div className={styles.cs}>
        <div className={styles.soon}>coming soon...</div>
        <img src={imprint} className={styles.icon} alt="NTTpreview"></img>
      </div>
    </div>
  );
};

export default NTT;
