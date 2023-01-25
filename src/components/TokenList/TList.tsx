import React from "react";
import styles from "./TList.module.css";
import filter from "../../assets/filter.svg";
import circle from "../../assets/circle.svg";
import group from "../../assets/group16.svg";
import atom from "../../assets/atom.svg";
import usd from "../../assets/usdlogo.svg";
import dk from "../../assets/die_kuche.svg";
import leftarrow from "../../assets/leftarrow.svg";
import rightarrow from "../../assets/rightarrow.svg";

const TList = () => {
  return (
    <div className={styles.list}>
      <div className={styles.name}>poooooooools!</div>
      <div className={styles.filter}>
        <img className={styles.iconfilter} src={filter} alt=""></img>
        <div className={styles.searchfil}>Filter tokens</div>
      </div>
      <div className={styles.sheets}>
        <div className={styles.firststr}>
          <div className={styles.columnname}>Network</div>
          <div className={styles.pool}>Pool</div>
          <div className={styles.columnname}>Total Liquidity</div>
          <div className={styles.columnname}>Bonded</div>
          <div className={styles.columnname}>ARP</div>
        </div>
        <div className={styles.secondstr}>
          <img className={styles.circle} src={circle} alt=""></img>
          <div className={styles.secsec}>
            <img className={styles.group} src={group} alt=""></img>
            <img className={styles.circletwo} src={circle} alt=""></img>
            GUT / BOOT
          </div>
          <div className={styles.tl}>3.7m</div>
          <div className={styles.fotsec}>--</div>
          <div className={styles.fifsec}>54.51%</div>
        </div>
        <div className={styles.thisrt}>
          <img className={styles.atom} src={atom} alt=""></img>
          <div className={styles.thisec}>
            <img className={styles.group} src={group} alt=""></img>
            <img className={styles.atomtwo} src={atom} alt=""></img>
            GUT / BOOT
          </div>
          <div className={styles.tl}>3.7m</div>
          <div className={styles.fotsec}>--</div>
          <div className={styles.fifsec}>0.13%</div>
        </div>
        <div className={styles.fotystr}>
          <img className={styles.atom} src={atom} alt=""></img>
          <div className={styles.thisec}>
            <img className={styles.group} src={group} alt=""></img>
            <img className={styles.usd} src={usd} alt=""></img>
            GUT / BOOT
          </div>
          <div className={styles.tl}>3.7m</div>
          <div className={styles.fotsec}>--</div>
          <div className={styles.fifsec}>4.11%</div>
        </div>
        <div className={styles.fiftstr}>
          <img className={styles.circle} src={circle} alt=""></img>
          <div className={styles.fifsec}>
            <img className={styles.group} src={group} alt=""></img>
            <img className={styles.dk} src={dk} alt=""></img>
            GUT / BOOT
          </div>
          <div className={styles.tl}>3.7m</div>
          <div className={styles.fotsec}>--</div>
          <div className={styles.fifsec}>143,32%</div>
        </div>
        <div className={styles.sixstr}>
          <img className={styles.circle} src={circle} alt=""></img>
          <div className={styles.sixsec}>
            <img className={styles.group} src={group} alt=""></img>
            <img className={styles.dk} src={dk} alt=""></img>
            GUT / BOOT
          </div>
          <div className={styles.tl}>3.7m</div>
          <div className={styles.fotsec}>--</div>
          <div className={styles.fifsec}>54.51%</div>
        </div>
      </div>
      <div className={styles.page}>
        <img className={styles.leftarrow} src={leftarrow} alt=""></img>
        Page 1 of 2
        <img className={styles.rightarrow} src={rightarrow} alt=""></img>
      </div>
    </div>
  );
};

export default TList;
