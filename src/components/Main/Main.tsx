import React from "react";
import BasicWindow from "../BasicWindow/BasicWindow";
import ManageTok from "../ManageTok/ManageTok";
import styles from "../Main/main.module.css";

const Main = () => {
  return (
    <div className={styles.colorhead}>
      <div>
        <BasicWindow />
      </div>
      <div className={styles.colorsecond}>
        <ManageTok />
      </div>
    </div>
  );
};

export default Main;
