import React from "react";
import styles from "./newButton.module.css";
import download from "../../assets/download.svg";

const NewButton = () => {
  return (
    <div className={styles.common}>
      <button className={styles.hugesize}>Connect Wallet!</button>
    </div>
  );
};

export default NewButton;
