import React from "react";
import styles from "./Boot.module.css";
import circle from "../../assets/circle.svg";

const Boot = () => {
  return (
    <div className={styles.boot}>
      <img className={styles.circle} src={circle} alt="" />
      BOOT
    </div>
  );
};

export default Boot;
