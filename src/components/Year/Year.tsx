import React from "react";
import styles from "../Year/Year.module.css";
import arrowY from "../Year/ArrowYellow.svg";

const Year = () => {
  return (
    <div className={styles.year}>
      2024
      <img className={styles.arrow} src={arrowY} alt=""></img>
      <div className={styles.year}>2023</div>
    </div>
  );
};

export default Year;
