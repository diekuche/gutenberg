import React from "react";
import styles from "./Dep.module.css";
import circle from "../../../assets/circle.svg";
import NewBT from "../../newButton/newButton";
import schwein from "../../../assets/schwein.svg";

const Dep = () => {
  return (
    <div className={styles.depositWindow}>
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
            <img className={styles.schwein} src={schwein} alt=""></img>
            <div className={styles.bootToken}>PIG</div>
          </div>
        </div>
        <div className={styles.secondStirngTwoField}>
          <div className={styles.cash}>$0.00</div>
          <div className={styles.balance}>Balance:25.000.000</div>
        </div>
      </div>

      <NewBT size="hg">deposit</NewBT>
    </div>
  );
};

export default Dep;
