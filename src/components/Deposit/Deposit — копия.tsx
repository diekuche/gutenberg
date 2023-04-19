import React from "react";
import styles from "./Deposit.module.css";
import circle from "../../assets/circle.svg";
import NewBT from "../newButton/newButton";
import cross from "../../assets/cross.svg";

const Deposit = () => {
  return (
    <div className={styles.depositWindow}>
      <img className={styles.cross} src={cross} alt=""></img>
      <div className={styles.nameField}>Boot/Pig</div>
      <div className={styles.anyWindow}>
        <div className={styles.deposit}>deposit</div>
        <div className={styles.withdraw}>withdraw</div>
        <div className={styles.farm}>farm</div>
        <div className={styles.unfarm}>unfarm</div>
      </div>
      <div className={styles.firstField}>
        <div className={styles.firstStringOneField}>
          <div className={styles.value}>124.456.349</div>
          <div className={styles.element}>
            <div className={styles.level}>max</div>
            <img className={styles.circle} src={circle} alt=""></img>
            <div className={styles.bootToken}>BOOT</div>
          </div>
        </div>
        <div className={styles.secondStirngTwoField}>
          <div className={styles.cash}>$0.00</div>
          <div className={styles.balance}>Balance:10.000.000</div>
        </div>
      </div>
      <div className={styles.secondField}>
        <div className={styles.firstStringOneField}>
          <div className={styles.value}>23.567</div>
          <div className={styles.element}>
            <div className={styles.level}>max</div>
            <img className={styles.circle} src={circle} alt=""></img>
            <div className={styles.bootToken}>PIG</div>
          </div>
        </div>
        <div className={styles.secondStirngTwoField}>
          <div className={styles.cash}>$0.00</div>
          <div className={styles.balance}>Balance:145.850563</div>
        </div>
      </div>

      <NewBT size="hg">deposit</NewBT>
    </div>
  );
};

export default Deposit;
