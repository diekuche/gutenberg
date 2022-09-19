import React from "react";
import styles from "./Tabs.module.css";

const Tabs = () => {
  return (
    <div className={styles.tabs}>
      <div className={styles.tabsToken}>Token</div>
      <div className={styles.tabsNFT}>NFT</div>
    </div>
    
  );
};

export default Tabs;
