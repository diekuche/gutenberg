import React from "react";
import styles from "../NTT/NTT.module.css";
import imprint from "../../assets/Imprint.svg";

const NTT = () => {
  return (
    <div className={styles.ntt}>
      <div className={styles.cs}>
        <img src={imprint} className={styles.icon} alt="NTTpreview"></img>
      </div>
    </div>
  );
};

export default NTT;
