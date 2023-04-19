import React from "react";
import styles from "./MyPools.index.module.css";
import greyArrowDown from "../../../assets/greyArrowDown.svg";
import circle from "../../../assets/circle.svg";
import atom from "../../../assets/atom.svg";
import downArrowPools from "../../../assets/downArrowPools.svg";

const MyPools = () => {
  return (
    <div>
      <div className={styles.title}>My pools</div>
      <div className={styles.tablePools}>
        <table>
          <thead>
            <tr>
              <th className={styles.pair}>Pair</th>
              <th>ARP</th>
              <th>
                Total Liquidity
                <img
                  className={styles.downarrow}
                  src={greyArrowDown}
                  alt=""
                ></img></th>
              <th>Bonded</th>
            </tr>
          </thead>
          <tbody className={styles.mainTable}>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td>54.51%</td>
              <td>$34</td>
              <td className={styles.bonded}>$787</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td>54.51%</td>
              <td>$34</td>
              <td className={styles.bonded}>$787</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td>54.51%</td>
              <td>$34</td>
              <td className={styles.bonded}>$787</td>
            </tr>
          </tbody>
        </table>
        <button className={styles.buttonDown}>
          <img src={downArrowPools} alt=""></img>
        </button>
      </div>
    </div>
  );
};

export default MyPools;
