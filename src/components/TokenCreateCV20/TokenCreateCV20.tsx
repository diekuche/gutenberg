import react from "react";
import styles from "../TokenCreateCV20/TokenCreateCV20.module.css";

const TokenCreateCV20 = () => {
  return (
    <div className={styles.tokenstr}>
      <button className={styles.namestrFS}>Create CV20</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Icons Storage</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Terms Storage</button>
    </div>
  );
};

export default TokenCreateCV20;
