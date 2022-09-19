import React from "react";
import styles from "./Tabs.module.css";

const Tabs = () => {
  return (
    <div className={styles.tabs}>
      <input type="radio" name="inset" value="" id="tab_1" checked></input>
      <label htmlFor="tab_1">Token</label>

      <input type="radio" name="inset" value="" id="tab_2"></input>
      <label htmlFor="tab_2">NFT</label> 

      <div id="txt_1">
        <p>в лесу родилась елочка.</p>
      </div>
      <div id="txt_2">
        <p>в лесу она росла</p>
      </div>
    </div>
    
  );
};

export default Tabs;
