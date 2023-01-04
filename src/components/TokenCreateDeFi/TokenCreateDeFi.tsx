import react from "react";
import styles from "../TokenCreateDeFi/TokenCreateDeFi.module.css";

const TokenCreateDeFi = () => {
  return (
    <div className={styles.tokenstr}>
      <button className={styles.namestr}>DeFi Tools</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Loans</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Options</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Prediction Markets</button>
    </div>
  );
};

export default TokenCreateDeFi;
