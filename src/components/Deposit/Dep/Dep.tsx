import React from "react";
import styles from "./Dep.module.css";
import circle from "../../../assets/circle.svg";
import NewBT from "../../newButton/newButton";
import schwein from "../../../assets/schwein.svg";
import { AppStatePool } from "../../../context/AppStateContext";

export type DepProps = {
  pool: AppStatePool
};

const Dep = ({
  pool,
}: DepProps) => (
  <div className={styles.depositWindow}>
    <div className={styles.firstField}>
      <div className={styles.firstStringOneField}>
        <div className={styles.value}>124.456.349</div>
        <div className={styles.element}>
          <div className={styles.level}>max</div>
          <img className={styles.circle} src={circle} alt="" />
          <div className={styles.bootToken}>{pool.symbol1}</div>
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
          <img className={styles.schwein} src={schwein} alt="" />
          <div className={styles.bootToken}>{pool.symbol2}</div>
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

export default Dep;
