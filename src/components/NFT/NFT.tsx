import React from "react";
import styles from "../NFT/NFT.module.css";
import hammer from "../../assets/Icon2.svg";

const NFT = () => {
  return (
    <div className={styles.nft}>
      <div className={styles.cs}>
        <div>coming soon...</div>
        <img src={hammer} className={styles.icon} alt="NFTpreview"></img>
      </div>
    </div>
  );
};

export default NFT;
