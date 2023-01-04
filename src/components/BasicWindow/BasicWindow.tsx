import React from "react";
import ManageTok from "../ManageTok/ManageTok";
import styles from "../BasicWindow/BasicWindow.module.css";

const BasicWindow = () => {
  return (
    <div className={styles.mid}>
      <div className={styles.text}>create!</div>
      <div className={styles.text}>manage!</div>
      <div className={styles.text}>
        swap!
        <button className={styles.gocre}>go create!</button>
      </div>
      <div className={styles.inf}>
        This project allows to create, mint and manage any possible number of
        tokens.
      </div>
    </div>
  );
};

export default BasicWindow;
