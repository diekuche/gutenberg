import react from "react";
import styles from "../TokenCreateNTT/TokenCreateNTT.module.css";

const TokenCreateNTT = () => {
  return (
    <div className={styles.tokenstr}>
      <button className={styles.namestr}>Create NTT</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Non-transferable Standart</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Manage</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Registries</button>
    </div>
  );
};

export default TokenCreateNTT;
