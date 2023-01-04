import react from "react";
import styles from "../TokenCreateManage/TokenCreateManage.module.css";

const TokenCreateManage = () => {
  return (
    <div className={styles.tokenstr}>
      <button className={styles.namestrFS}>Manage CV20</button>
      <div className={styles.triangleR}></div>
      <button className={styles.iconsecond}>Send</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Mint</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Burn</button>
    </div>
  );
};

export default TokenCreateManage;
