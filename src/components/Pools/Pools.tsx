import React from "react";
import styles from "./Pools.module.css";
import circle from "../../assets/circle.svg";
import atom from "../../assets/atom.svg";
import leftarrow from "../../assets/greyArrowLeft.svg";
import rightarrow from "../../assets/greyArrowRight.svg";
import greyArrowDown from "../../assets/greyArrowDown.svg";
import MyInvestment from "../Pools/MyInvestment/MyInvestment";

const Pools = () => {
  return (
    <div className={styles.main}>
      <div className={styles.firstString}>
        <div className={styles.name}>pools!</div>
        <button className={styles.buttonCreate}>create new pools!</button>
      </div>
      <MyInvestment />
      <div className={styles.secondString}>
        <div className={styles.string}>all pools</div>
        <input
          className={styles.filterTokens}
          type="text"
          placeholder="Filter tokens"
        />
      </div>
      <div className={styles.tokenList}>
        <table className={styles.tableToken}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.pair}>Pair</th>
              <th className={styles.arpHead}>ARP</th>
              <th className={styles.totalLiquiity}>
                Total Liquidity
                <img
                  className={styles.downarrow}
                  src={greyArrowDown}
                  alt=""
                ></img>
              </th>
              <th className={styles.volume}>Volume (24h)</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.stringTokens}>
              <td className={styles.pairArp}>
                <img className={styles.atom} src={atom} alt=""></img>
                <img className={styles.circle} src={circle} alt=""></img>
                <div className={styles.cent}>ATOM/BOOT</div>
              </td>
              <td className={styles.arp}>54.51%</td>
              <td className={styles.cash}>$283,478,297</td>
              <td className={styles.cash}>$283,478,297</td>
            </tr>
            <tr className={styles.stringTokens}>
              <td className={styles.pairArp}>
                <img className={styles.atom} src={atom} alt=""></img>
                <img className={styles.circle} src={circle} alt=""></img>
                ATOM/BOOT
              </td>
              <td className={styles.arp}>0.13%</td>
              <td className={styles.cash}>$283,478,297</td>
              <td className={styles.cash}>$283,478,297</td>
            </tr>
            <tr className={styles.stringTokens}>
              <td className={styles.pairArp}>
                <img className={styles.atom} src={atom} alt=""></img>
                <img className={styles.circle} src={circle} alt=""></img>
                ATOM/BOOT
              </td>
              <td className={styles.arp}>4.11%</td>
              <td className={styles.cash}>$283,478,297</td>
              <td className={styles.cash}>$283,478,297</td>
            </tr>
            <tr className={styles.stringTokens}>
              <td className={styles.pairArp}>
                <img className={styles.atom} src={atom} alt=""></img>
                <img className={styles.circle} src={circle} alt=""></img>
                ATOM/BOOT
              </td>
              <td className={styles.arp}>143.32%</td>
              <td className={styles.cash}>$283,478,297</td>
              <td className={styles.cash}>$283,478,297</td>
            </tr>
            <tr className={styles.stringTokens}>
              <td className={styles.pairArp}>
                <img className={styles.atom} src={atom} alt=""></img>
                <img className={styles.circle} src={circle} alt=""></img>
                ATOM/BOOT
              </td>
              <td className={styles.arp}>54.51%</td>
              <td className={styles.cash}>$283,478,297</td>
              <td className={styles.cash}>$283,478,297</td>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <div className={styles.page}>
                <img className={styles.leftarrow} src={leftarrow} alt=""></img>
                Page 1 of 2
                <img
                  className={styles.rightarrow}
                  src={rightarrow}
                  alt=""
                ></img>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pools;
