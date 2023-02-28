import React from "react";
import styles from "./Pig.module.css";
import pigIcon from "../../assets/PigIcon.svg";

const Pig = () => {
  return (
    <div className={styles.pig}>
      <img className={styles.pigIcon} src={pigIcon} alt="" />
      PIG
    </div>
  );
};

export default Pig;
