import react from "react";
import styles from "../TokenCreateCV721/TokenCreateCV721.module.css";

const TokenCreateCV721 = () => {
  return (
    <div className={styles.tokenstr}>
      <button className={styles.namestr}>Create CV721 (NFT)</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Images Data Storage</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Collections</button>
    </div>
  );
};

export default TokenCreateCV721;
