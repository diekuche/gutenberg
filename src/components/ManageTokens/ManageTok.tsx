import React from "react";
import styles from "./ManageTok.module.css";
import ButtonSend from "../Button/ButtonSend";
import ButtonAddToken from "../Button/ButtonAddToken";

const ManageTokens = () => {
  return (
    <div className={styles.manageTok}>
      <div className={styles.name}>Manage Tokens</div>
      <div className={styles.cashName}>
        🟢 StBOOT
        <div className={styles.cash}>3 000 000 000</div>
      </div>

      <div className={styles.info}>
        Saint Bostrom — Blessed Bostroms for charitable deeds
      </div>
      <div className={styles.info}>
        Contract Address: bostrom123456789qwertyasdfghjkl
      </div>
      <ButtonSend />
      <div className={styles.line}></div>
      <div className={styles.cashName}>
        {" "}
        🇬🇪 KLARI
        <div className={styles.cash}>1000</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.cashName}>
        💩 ShitCoin
        <div className={styles.cash}>500</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.cashName}>
        {" "}
        🐽PigNon
        <div className={styles.cash}>10 000</div>
      </div>
      <ButtonAddToken />
    </div>
  );
};

export default ManageTokens;
