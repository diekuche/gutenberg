import React from "react";
import styles from "./newButton.module.css";
import download from "../../assets/download.svg";

const NewButton = () => {
  return (
    <div className={styles.common}>
      <button className={styles.hugesize}>Connect Wallet!</button>
      <div>
        <button className={styles.smallsize}>Connect Wallet</button>
        <button className={styles.smallsizeact}>
          Connecting
          <img className={styles.download} src={download} alt=""></img>
        </button>
      </div>
    </div>
  );
};

export default NewButton;
