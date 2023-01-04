import react from "react";
import styles from "../TokenCNameServis/TokenCNameServis.module.css";

const TokenCNameServis = () => {
  return (
    <div className={styles.tokenstr}>
      <button className={styles.namestr}>Name Servis</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Registries</button>
    </div>
  );
};

export default TokenCNameServis;
