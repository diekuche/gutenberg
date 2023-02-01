import React from "react";
import styles from "./Swap.module.css";
import downarrow from "../../assets/downarrow.svg";
import UpDoAr from "../../assets/UpDoAr.svg";
import downyellow from "../../assets/downyellow.svg";
import NewBT from "../newButton/newButton";

const NewButton = () => {
  return (
    <div className={styles.common}>
      <div className={styles.swap}>
        <div className={styles.up}>
          <div className={styles.priceup}>0</div>
          <button className={styles.select}>
            Select Token
            <img className={styles.downarrow} src={downarrow} alt="" />
          </button>
        </div>
        <div className={styles.secstr}>
          <div className={styles.pricedown}>$0.00</div>
          <div className={styles.pricedown}>Balance:0</div>
        </div>
        <div className={styles.center}>
          <div className={styles.line}></div>
          <div className={styles.circle}>
            <img className={styles.uda} src={UpDoAr} alt="" />
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.lowerprice}>0</div>
          <button className={styles.lowerselect}>
            Select Token
            <img className={styles.downarrow} src={downarrow} alt="" />
          </button>
        </div>
        <div className={styles.secstr}>
          <div className={styles.pricedown}>$0.00</div>
          <div className={styles.pricedown}>Balance:0</div>
        </div>
        <div className={styles.strslip}>
          <div className={styles.slip}>
            Slippage 1%
            <img className={styles.downar} src={downyellow} alt="" />
          </div>
          <div className={styles.fee}>Swap fee (0.3%)</div>
        </div>
        <div></div>
      </div>
      <NewBT />
      {/* <button className={styles.hugesize}>Connect Wallet!</button>*/}
    </div>
  );
};

export default NewButton;
