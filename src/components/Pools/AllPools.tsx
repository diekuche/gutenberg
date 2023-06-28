import {
  useState,
} from "react";
import styles from "./Pools.module.css";
import circle from "../../assets/circle.svg";
import atom from "../../assets/atom.svg";
import leftarrow from "../../assets/greyArrowLeft.svg";
import rightarrow from "../../assets/greyArrowRight.svg";
import greyArrowDown from "../../assets/greyArrowDown.svg";
import Deposit from "../Deposit/Deposit";

import Modal from "../Modal/Modal";
import { AppStatePool } from "../../context/AppStateContext";

type AllPoolsProps = {
  pools: AppStatePool[]
};

const AllPools = ({
  pools,
}: AllPoolsProps) => {
  const [poolForDeposit, setPoolForDeposit] = useState<AppStatePool | null>(null);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const onPoolDeposit = (pool: AppStatePool) => {
    setPoolForDeposit(pool);
    setModal(true);
  };
  return (
    <>
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
                />
              </th>
              <th className={styles.volume}>Volume (24h)</th>
            </tr>
          </thead>
          <tbody className={styles.mainTable}>
            {pools.map((pool) => (
              <tr key={pool.index} onClick={() => onPoolDeposit(pool)}>
                <td className={styles.pairwidth}>
                  <div className={styles.pairPool}>
                    <img className={styles.imgToken_1} src={atom} alt="" />
                    <img
                      className={styles.imgToken_2}
                      src={circle}
                      alt=""
                    />
                    <div className={styles.pair}>{`${pool.symbol1}/${pool.symbol2}`}</div>
                  </div>
                </td>
                <td className={styles.ARP}>54.51%</td>
                <td>$283,478,297</td>
                <td className={styles.volume}>$111,111,111</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.page}>
          <button type="button" className={styles.leftButton}>
            <img src={leftarrow} alt="" />
          </button>
          <div>Page 1 of 2</div>
          <button type="button" className={styles.rightButton}>
            <img src={rightarrow} alt="" />
          </button>
        </div>
      </div>
      <Modal open={modal} onClose={toggleModal}>
        {poolForDeposit && <Deposit pool={poolForDeposit} />}
      </Modal>
    </>
  );
};

export default AllPools;
