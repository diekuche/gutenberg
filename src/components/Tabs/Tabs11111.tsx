import React from "react";
import styles from "./Tabs.module.css";

const Tabs = () => {
  return (
    <div className={styles.tabs}>
      <div className={styles.token}>NFT</div>
      <input type="radio"
         name="tab-btn"
         id="tab-btn-1"
         value="" checked>
          /</input>
      <div className={styles.NFT}>NFT</div>
    </div>
    
  );
};

export default Tabs;
