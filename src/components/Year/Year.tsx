import React from "react";
import styles from "../Year/Year.module.css";

const Year = () => {
  return (
    <div className={styles.year}>
      <div className={styles.yearDown}>
        2024
        <div className={styles.yearUp}>2023</div>
      </div>
    </div>
  );
};

export default Year;
