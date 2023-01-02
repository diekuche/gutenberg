import React from "react";
import styles from "../ManageTok/ManageTok.module.css";
import Arrow from "../Arrow/Arrow";
import Year from "../Year/Year";


const ManTok = () => {
  return (
    <div className={styles.mt}>
    <div className={styles.vert}>
      <div className={styles.txtR}>roadmap</div>
      <div className={styles.txtS}>Switch Netorks
      <div className={styles.tigD}></div>
      <Arrow />
      <div className={styles.bridge}>Bridge</div>
      <Arrow />
      <div className={styles.tigU}></div>
      <div className={styles.bn}>Bostrom Network</div>
      </div>
     <Year />
      </div>
    <div className={styles.choice}>
      <div className={styles.tokenstr}>
      <button className={styles.namestr}>Create CV20
      <span className={styles.check}></span>
      <input type="checkbox" />
      <div className={styles.circle}></div>
      </button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Icons Storage</button>
      <div className={styles.tigR}></div> 
      <button className={styles.icon}>Terms Storage</button>
      </div>
      <div className={styles.tokenstr}>
      <button className={styles.namestr}>Manage CV20</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Send</button>
      <div className={styles.tigR}></div> 
      <button className={styles.icon}>Mint</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Burn</button>
      </div>
      <div className={styles.tokenstr}>
      <button className={styles.namestr}>Swap CV20</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Liquidity Pools</button>
      <div className={styles.tigR}></div> 
      <button className={styles.icon}>Farms</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Registries</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Deposit/Withdraw</button>
      </div>
      <div className={styles.tokenstr}>
      <button className={styles.namestr}>Creane NTT</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Non-transferable Standart</button>
      <div className={styles.tigR}></div> 
      <button className={styles.icon}>Manage</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Registries</button>
      </div>
      <div className={styles.tokenstr}>
      <button className={styles.namestr}>Create CV721 (NFT)</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Images Data Storage</button>
      <div className={styles.tigR}></div> 
      <button className={styles.icon}>Collections</button>
      </div>
      <div className={styles.tokenstr}>
      <button className={styles.namestr}>NFT Marketplace</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>P2P Trades</button>
      <div className={styles.tigR}></div> 
      <button className={styles.icon}>Swap</button>
      </div>
      <div className={styles.tokenstr}>
      <button className={styles.namestr}>Name Servis</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Registries</button>
      </div>
      <div className={styles.tokenstr}>
      <button className={styles.namestr}>DeFi Tools</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Loans</button>
      <div className={styles.tigR}></div> 
      <button className={styles.icon}>Options</button>
      <div className={styles.tigR}></div>
      <button className={styles.icon}>Prediction Markets</button>
      </div>
      </div>
    </div>
  );
};
export default ManTok;