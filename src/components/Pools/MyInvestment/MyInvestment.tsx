import React from "react";
import styles from "./MyInvestment.index.module.css";

const MyInvestment = () => {
  return (
    <div>
      <div className={styles.title}>My investment</div>
      <div className={styles.myActive}>
        <div className={styles.total}>
          <div className={styles.nameColumn}>Total</div>
          <div className={styles.cash}>$0.00</div>
        </div>
        <div className={styles.rewards}>
          <div className={styles.nameColumn}>Rewards</div>
          <div className={styles.cash}>$0</div>
        </div>
        <button className={styles.buttonClaim}>claim all</button>
      </div>
    </div>
  );
};

export default MyInvestment;
