import React from "react";
import styles from "../NFT/NFT.module.css";
import hammer from "../../assets/nftcs.svg";

const NFT = () => {
  return (
    <div className={styles.nft}>
      <div className={styles.cs}>
        <div className={styles.soon}>coming soon...</div>
        <img src={hammer} className={styles.icon} alt="NFTpreview"></img>
      </div>
    </div>
  );
};

export default NFT;
