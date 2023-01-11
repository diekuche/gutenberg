import React from "react";
import styles from "../ManageTok/ManageTok.module.css";
import Arrow from "../Arrow/Arrow";
import Year from "../Year/Year";
import green from "../ManageTok/vargreen.svg";
import yellow from "../ManageTok/varyellow.svg";
import arrowGD from "../ManageTok/ArrowGreenD.svg";
import arrowGUp from "../ManageTok/ArrowGUp.svg";
import arrRight from "../ManageTok/Icon.svg";
import arrRiYel from "../ManageTok/IconYelow.svg";

const ManTok = () => {
  return (
    <div className={styles.mantok}>
      <div className={styles.vertical}>
        <div className={styles.roadmap}>roadmap</div>
        <div className={styles.switchNet}>
          <div className={styles.switch}>Switch Netorks</div>
          <img className={styles.arrow} src={arrowGUp} alt=""></img>
          <div className={styles.bridge}>Bridge</div>
          <img className={styles.arrow} src={arrowGD} alt=""></img>
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
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Icons Storage</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Terms Storage</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestrFS}>
            Manage CV20
            <img className={styles.icongreen} src={green} alt=""></img>
          </button>
          <img className={styles.iconarrow} src={arrRiYel} alt=""></img>
          <button className={styles.iconsecond}>
            Send
            <img className={styles.iconyellow} src={yellow} alt=""></img>
          </button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Mint</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Burn</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>Swap CV20</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Liquidity Pools</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Farms</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Registries</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Deposit/Withdraw</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>Create NTT</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Non-transferable Standart</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Manage</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Registries</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>Create CV721 (NFT)</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Images Data Storage</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Collections</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>NFT Marketplace</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>P2P Trades</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Swap</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>Name Servis</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Registries</button>
        </div>
        <div className={styles.tokenstr}>
          <button className={styles.namestr}>DeFi Tools</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Loans</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Options</button>
          <img className={styles.iconarrow} src={arrRight} alt=""></img>
          <button className={styles.icon}>Prediction Markets</button>
        </div>
      </div>
    </div>
  );
};
export default ManTok;
