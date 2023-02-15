import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../BasicWindow/BasicWindow.module.css";

const BasicWindow = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.middle}>
      <div className={styles.headerStrFirst}>create!</div>
      <div className={styles.headerStr}>manage!</div>
      <div className={styles.headerStrThird}>
        swap!
        <button className={styles.goCre} onClick={() => navigate("/old")}>
          go create!
        </button>
      </div>
      <div className={styles.info}>
        This project allows to create, mint and manage any possible number of
        tokens.
      </div>
    </div>
  );
};

export default BasicWindow;
