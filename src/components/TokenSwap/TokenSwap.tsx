import react from "react";
import styles from "../TokenSwap/TokenSwap.module.css";

const TokenSwap = () => {
  return (
    <div className={styles.tokenstr}>
      <button className={styles.namestr}>Swap CV20</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Liquidity Pools</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Farms</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Registries</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Deposit/Withdraw</button>
    </div>
  );
};

export default TokenSwap;
