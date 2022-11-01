import React from "react";
import styles from "../NFT/NFT.module.css";
import hammer from "../NFT/ham.jpg";

const NFT = () => {
  return (
    <div className={styles.nft}>
      <div className={styles.create}>create NFT</div>
      <div className={styles.cs}>
        <img className={styles.hammer} src={hammer} alt=""></img>
        <div>COMING SOON...</div>
      </div>
    </div>
  );
};

export default NFT;
