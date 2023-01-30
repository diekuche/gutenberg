import React from "react";
import styles from "./TList.module.css";
import circle from "../../assets/circle.svg";
import group from "../../assets/group16.svg";
import atom from "../../assets/atom.svg";
import usd from "../../assets/usdlogo.svg";
import dk from "../../assets/die_kuche.svg";
import leftarrow from "../../assets/leftarrow.svg";
import rightarrow from "../../assets/rightarrow.svg";
import downarrow from "../../assets/downarrow.svg";

const TList = () => {
  return (
    <div className={styles.list}>
      <div className={styles.name}>poooooooools!</div>
      <div className={styles.pad}>
        <input className={styles.inp} type="text" placeholder="Filter tokens" />
      </div>
      <div className={styles.tllist}>
        <table>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.network}>Network</th>
              <th className={styles.pool}>Pool</th>
              <th className={styles.tl}>
                Total Liquidity
                <img className={styles.downarrow} src={downarrow} alt=""></img>
              </th>
              <th className={styles.bon}>Bonded</th>
              <th className={styles.ar}>ARP</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.trcolor}>
              <td>
                <img className={styles.circle} src={circle} alt=""></img>
              </td>
              <td className={styles.poolarp}>
                <img className={styles.group} src={group} alt=""></img>
                <img className={styles.circle} src={circle} alt=""></img>
                <div className={styles.cent}>
                  GUT
                  <span> / </span>
                  BOOT
                </div>
              </td>
              <td className={styles.tlb}>3.7m</td>
              <td className={styles.tlb}>--</td>
              <td className={styles.arp}>54.51%</td>
            </tr>
            <tr>
              <td>
                <img className={styles.atom} src={atom} alt=""></img>
              </td>
              <td className={styles.poolarp}>
                <img className={styles.group} src={group} alt=""></img>
                <img className={styles.atom} src={atom} alt=""></img>
                GUT
                <span> / </span>
                BOOT
              </td>
              <td className={styles.tlb}>3.7m</td>
              <td className={styles.tlb}>--</td>
              <td className={styles.arp}>0.13%</td>
            </tr>
            <tr className={styles.trcolor}>
              <td>
                <img className={styles.atom} src={atom} alt=""></img>
              </td>
              <td className={styles.poolarp}>
                <img className={styles.group} src={group} alt=""></img>
                <img className={styles.usd} src={usd} alt=""></img>
                GUT
                <span> / </span>
                BOOT
              </td>
              <td className={styles.tlb}>3.7m</td>
              <td className={styles.tlb}>--</td>
              <td className={styles.arp}>4.11%</td>
            </tr>
            <tr>
              <td>
                <img className={styles.circle} src={circle} alt=""></img>
              </td>
              <td className={styles.poolarp}>
                <img className={styles.group} src={group} alt=""></img>
                <img className={styles.dk} src={dk} alt=""></img>
                GUT
                <span> / </span>
                BOOT
              </td>
              <td className={styles.tlb}>3.7m</td>
              <td className={styles.tlb}>--</td>
              <td className={styles.arp}>143.32%</td>
            </tr>
            <tr className={styles.trcolor}>
              <td>
                <img className={styles.circle} src={circle} alt=""></img>
              </td>
              <td className={styles.poolarp}>
                <img className={styles.group} src={group} alt=""></img>
                <img className={styles.circle} src={circle} alt=""></img>
                GUT
                <span> / </span>
                BOOT
              </td>
              <td className={styles.tlb}>3.7m</td>
              <td className={styles.tlb}>--</td>
              <td className={styles.arp}>54.51%</td>
            </tr>
          </tbody>
        </table>
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
