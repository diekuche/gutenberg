import React from "react";
import styles from "./MyPools.index.module.css";
import greyArrowDown from "../../../assets/greyArrowDown.svg";
import circle from "../../../assets/circle.svg";
import atom from "../../../assets/atom.svg";
import downArrowPools from "../../../assets/downArrowPools.svg";

const MyPools = () => {
  return (
    <div>
      <div className={styles.name}>my pools</div>
      <table className={styles.tableToken}>
        <thead>
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
            <th className={styles.volume}>Bonded</th>
          </tr>
        </thead>
        <tbody className={styles.mainTable}>
          <tr className={styles.stringTokens}>
            <td className={styles.pairArp}>
              <img className={styles.atom} src={atom} alt=""></img>
              <img className={styles.circle} src={circle} alt=""></img>
              <div className={styles.cent}>ATOM/BOOT</div>
            </td>
            <td className={styles.arp}>54.51%</td>
            <td className={styles.cash}>$34</td>
            <td className={styles.bondedCash}>$787</td>
          </tr>
          <tr className={styles.stringTokens}>
            <td className={styles.pairArp}>
              <img className={styles.atom} src={atom} alt=""></img>
              <img className={styles.circle} src={circle} alt=""></img>
              ATOM/BOOT
            </td>
            <td className={styles.arp}>54.3%</td>
            <td className={styles.cash}>$2</td>
            <td className={styles.bondedCash}>$0</td>
          </tr>
          <tr className={styles.stringTokens}>
            <td className={styles.pairArp}>
              <img className={styles.atom} src={atom} alt=""></img>
              <img className={styles.circle} src={circle} alt=""></img>
              ATOM/BOOT
            </td>
            <td className={styles.arp}>54.3%</td>
            <td className={styles.cash}>$0</td>
            <td className={styles.bondedCash}>$0</td>
          </tr>
          <tr>
            <th></th>

            <div className={styles.downList}>
              <button className={styles.buttonDown}>
                <img src={downArrowPools} alt=""></img>
              </button>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyPools;
