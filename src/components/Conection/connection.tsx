import React from "react";
import styles from "./connection.module.css";
import download from "../../assets/download.svg";

const Connection = () => {
  return (
    <div className={styles.common}>
      <div>
        <button className={styles.smallsizeact}>
          Connecting
          <img className={styles.download} src={download} alt=""></img>
        </button>
      </div>
    </div>
  );
};

export default Connection;
