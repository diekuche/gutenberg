import React from "react";
import styles from "./Pools.module.css";
import circle from "../../assets/circle.svg";
import atom from "../../assets/atom.svg";
import leftarrow from "../../assets/greyArrowLeft.svg";
import rightarrow from "../../assets/greyArrowRight.svg";
import greyArrowDown from "../../assets/greyArrowDown.svg";
import MyInvestment from "../Pools/MyInvestment/MyInvestment";
import MyPools from "./MyPools/MyPools";

const Pools = () => {
  return (
    <div className={styles.main}>
      <div className={styles.firstString}>
        <div className={styles.name}>pools!</div>
        <button className={styles.buttonCreate}>create new pools!</button>
      </div>
      <MyInvestment />
      <MyPools />
      <div className={styles.secondString}>
        <div className={styles.allpools}>all pools</div>
        <input
          className={styles.filterTokens}
          type="text"
          placeholder="Filter tokens"
        />
      </div>
      <div className={styles.tablePools}>
        <table>
          <thead>
            <tr className={styles.theadPools}>
              <th className={styles.pair}>Pair</th>
              <th>ARP</th>
              <th>
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
          <tbody className={styles.mainTable}>
            <tr>
              <td className={styles.pairwidth}>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
            <tr>
              <td>
                <div className={styles.pairPool}>
                  <img className={styles.imgToken_1} src={atom} alt=""></img>
                  <img className={styles.imgToken_2} src={circle} alt=""></img>
                  <div className={styles.pair}>ATOM/BOOT</div>
                </div>
              </td>
              <td className={styles.ARP}>54.51%</td>
              <td>$283,478,297</td>
              <td className={styles.volume}>$283,478,297</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.page}>
          <button className={styles.leftButton}>
            <img src={leftarrow} alt=""></img>
          </button>
          <div>Page 1 of 2</div>
          <button className={styles.rightButton}>
            <img src={rightarrow} alt=""></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pools;
