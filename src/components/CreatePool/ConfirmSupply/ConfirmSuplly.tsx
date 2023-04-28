import React from "react";
import styles from "./ConfirmSuplly.module.css";
import cross from "../../../assets/cross.svg";
import NewBT from "../../newButton/newButton";
const Confirm = () => {
  return (
    <div className={styles.confirm}>
      <div className={styles.test1}>
        <img className={styles.cross} src={cross} alt=""></img>
        <div className={styles.name}>Confirm Supply</div>
        <div className={styles.text}>
          Creating TOKEN_NAME#2/TOKEN_NAME#2 liquidity pool You are providing
          the listed assets. The exchange rate is calculated automatically. Make
          sure you are aware of all the risks of providing liquidity.
        </div>
        <div className={styles.change}>
          <div className={styles.firstString}>
            <div className={styles.nameString}>deposited1</div>
            <div className={styles.test}>
              <div className={styles.nameToken}>TOKEN_NAME#1</div>
              <div className={styles.priceToken}>0.00</div>
            </div>
          </div>
          <div className={styles.secondString}>
            <div className={styles.nameString}>deposited2</div>
            <div className={styles.test}>
              <div className={styles.nameToken}>TOKEN_NAME#2</div>
              <div className={styles.priceToken}>1.00</div>
            </div>
          </div>
          <div className={styles.thirdString}>
            <div className={styles.nameString}>Exchanged Rate</div>

            <div className={styles.priceSummary}>0.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
