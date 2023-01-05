import React from "react";
import styles from "../ManageTok/ManageTok.module.css";
import Arrow from "../Arrow/Arrow";
import Year from "../Year/Year";
import green from "../ManageTok/green.png";
import yellow from "../ManageTok/yellow.png";

const ManTok = () => {
  return (
    <div className={styles.mantok}>
      <div className={styles.vertical}>
        <div className={styles.roadmap}>roadmap</div>
        <div className={styles.switchNet}>
          Switch Netorks
          <div className={styles.triangleD}></div>
          <Arrow />
          <div className={styles.bridge}>Bridge</div>
          <Arrow />
          <div className={styles.triangleU}></div>
          <div className={styles.bostnetw}>Bostrom Network</div>
        </div>
        <Year />
      </div>
      <div className={styles.choice}>
        <div className={styles.tokenstr}>
          <button className={styles.namestrFS}>
            Create CV20
            <img className={styles.icongreen} src={green} alt=""></img>
          </button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Icons Storage</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Terms Storage</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestrFS}>
            Manage CV20
            <img className={styles.icongreen} src={green} alt=""></img>
          </button>
          <div className={styles.triangleR}></div>
          <button className={styles.iconsecond}>
            Send
            <img className={styles.iconyellow} src={yellow} alt=""></img>
          </button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Mint</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Burn</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>Swap CV20</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Liquidity Pools</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Farms</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Registries</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Deposit/Withdraw</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>Create NTT</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Non-transferable Standart</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Manage</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Registries</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>Create CV721 (NFT)</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Images Data Storage</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Collections</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>NFT Marketplace</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>P2P Trades</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Swap</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>Name Servis</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Registries</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>DeFi Tools</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Loans</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Options</button>
          <div className={styles.triangleR}></div>
          <button className={styles.icon}>Prediction Markets</button>
        </div>
      </div>
    </div>
  );
};
export default ManTok;
