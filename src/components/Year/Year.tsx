import React from "react";
import styles from "../Year/Year.module.css";

const Year = () => {
  return (
    <div className={styles.year}>
      2024
      <div className={styles.tigD}></div>
      <div className={styles.arrow}></div>
      <div className={styles.year}>2023</div>
    </div>
  );
};

export default Year;
