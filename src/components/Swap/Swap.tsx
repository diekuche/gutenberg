import React from "react";
import styles from "./Swap.module.css";
import downArrow from "../../assets/downarrow.svg";
import UpDoAr from "../../assets/UpDoAr.svg";
import downyellow from "../../assets/downyellow.svg";
import NewBT from "../newButton/newButton";

const Swap = () => {
  return (
    <div className={styles.common}>
      <div className={styles.swap}>
        <div className={styles.up}>
          <div className={styles.priceUp}>0</div>
          <button className={styles.select}>
            Select Token
            <img className={styles.downArrow} src={downArrow} alt="" />
          </button>
        </div>
        <div className={styles.secstr}>
          <div className={styles.priceDown}>$0.00</div>
          <div className={styles.priceDown}>Balance:0</div>
        </div>
        <div className={styles.center}>
          <div className={styles.line}></div>
          <div className={styles.circle}>
            <img className={styles.iconSwap} src={UpDoAr} alt="" />
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.lowerPrice}>0</div>
          <button className={styles.lowerselect}>
            Select Token
            <img className={styles.downArrow} src={downArrow} alt="" />
          </button>
        </div>
        <div className={styles.secondString}>
          <div className={styles.priceDown}>$0.00</div>
          <div className={styles.priceDown}>Balance:0</div>
        </div>
        <div className={styles.stringSlippage}>
          <div className={styles.slippage}>
            Slippage 1%
            <img className={styles.downArrowYellow} src={downyellow} alt="" />
          </div>
          <div className={styles.fee}>Swap fee (0.3%)</div>
        </div>
        <div></div>
      </div>
      <NewBT text="Connect Wallet!" />
    </div>
  );
};

export default Swap;
