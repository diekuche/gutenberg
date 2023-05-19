import React, { useState } from "react";
import styles from "./Pools.module.css";
import circle from "../../assets/circle.svg";
import atom from "../../assets/atom.svg";
import leftarrow from "../../assets/greyArrowLeft.svg";
import rightarrow from "../../assets/greyArrowRight.svg";
import greyArrowDown from "../../assets/greyArrowDown.svg";

import Deposit from "../Deposit/Deposit";
import Modal from "../Modal/Modal";

const Pools = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Modal open={modal} onClose={toggleModal}>
        <Deposit />
      </Modal>

      <div className={styles.main}>
        <div className={styles.firstString}>
          <div className={styles.name}>pools!</div>
          <button className={styles.buttonCreate} onClick={toggleModal}>
            create new pools!
          </button>
        </div>

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
              <tr onClick={toggleModal}>
                <td className={styles.pairwidth}>
                  {/*                 {modal && (
                  <div className={styles.content}>
                    <div className={styles.overlay}></div>
                    <Deposit />
                  </div>
                )} */}
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
                    <div className={styles.pair}>ATOM/BOOT</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$111,111,111</td>
              </tr>
              <tr>
                <td>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt=""></img>
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    ></img>
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
    </div>
  );
};

export default Pools;
