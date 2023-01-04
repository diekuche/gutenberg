import react from "react";
import styles from "../TokenCreateNFT/TokenCreateNFT.module.css";

const TokenCreateNFT = () => {
  return (
    <div className={styles.tokenstr}>
      <button className={styles.namestr}>NFT Marketplace</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>P2P Trades</button>
      <div className={styles.triangleR}></div>
      <button className={styles.icon}>Swap</button>
    </div>
  );
};

export default TokenCreateNFT;
