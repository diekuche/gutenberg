import React from "react";
import styles from "../ManageTok/ManageTok.module.css";
import Arrow from "../Arrow/Arrow";
import Year from "../Year/Year";
import TokenCreateCV20 from "../TokenCreateCV20/TokenCreateCV20";
import TokenCreateManage from "../TokenCreateManage/TokenCreateManage";
import TokenSwap from "../TokenSwap/TokenSwap";
import TokenCreateNTT from "../TokenCreateNTT/TokenCreateNTT";
import TokenCreateNFT from "../TokenCreateNFT/TokenCreateNFT";
import TokenCreateCV721 from "../TokenCreateCV721/TokenCreateCV721";
import TokenCNameServis from "../TokenCNameServis/TokenCNameServis";
import TokenCreateDeFi from "../TokenCreateDeFi/TokenCreateDeFi";

const ManTok = () => {
  return (
    <div className={styles.mt}>
      <div className={styles.vert}>
        <div className={styles.roadmap}>roadmap</div>
        <div className={styles.switchNet}>
          Switch Netorks
          <div className={styles.triangleD}></div>
          <Arrow />
          <div className={styles.bridge}>Bridge</div>
          <Arrow />
          <div className={styles.triangleU}></div>
          <div className={styles.bn}>Bostrom Network</div>
        </div>
        <Year />
      </div>
      <div className={styles.choice}>
        <TokenCreateCV20 />
        <TokenCreateManage />
        <TokenSwap />
        <TokenCreateNTT />
        <TokenCreateCV721 />
        <TokenCreateNFT />
        <TokenCNameServis />
        <TokenCreateDeFi />
      </div>
    </div>
  );
};
export default ManTok;
