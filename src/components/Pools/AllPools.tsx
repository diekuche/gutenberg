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

const PAGE_SIZE = 10;

type AllPoolsProps = {
  pools: AppStatePool[];
  onPoolUpdated: (pool: AppStatePool)=> void;
};

const AllPools = ({
  onPoolUpdated,
  pools: nonFilteredPools,
}: AllPoolsProps) => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [poolForDeposit, setPoolForDeposit] = useState<AppStatePool | null>(null);
  const [modal, setModal] = useState(false);
  const pools = (
    filter
      ? nonFilteredPools.filter(
        (pool) => pool.symbol1.toLowerCase().includes(filter.toLowerCase())
        || pool.symbol2.toLowerCase().includes(filter.toLowerCase()),
      )
      : nonFilteredPools
  );
  const pagesCount = Math.ceil(pools.length / PAGE_SIZE);

  const toggleModal = () => {
    setModal(!modal);
  };

  const onPoolDeposit = (pool: AppStatePool) => {
    setPoolForDeposit(pool);
    setModal(true);
  };
  const onNextPage = () => {
    if (page < pagesCount) {
      setPage(page + 1);
    }
  };
  const onPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <>
      <div className={styles.secondString}>
        <div className={styles.allpools}>all pools</div>
        <input
          className={styles.filterTokens}
          type="text"
          placeholder="Filter tokens"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className={styles.tablePools}>
        <table>
          <thead>
            <tr className={styles.theadPools}>
              <th className={styles.pair}>Pair</th>
              <th>APR</th>
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
            {pools
              .slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE)
              .map((pool) => (
                <tr key={pool.address} onClick={() => onPoolDeposit(pool)}>
                  <td className={styles.pairwidth}>
                    <div className={styles.pairPool}>
                      {false
                      && (
                      <>
                        <img className={styles.imgToken_1} src={atom} alt="" />
                        <img
                          className={styles.imgToken_2}
                          src={circle}
                          alt=""
                        />

                      </>
                      )}
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
          <button
            type="button"
            className={styles.leftButton}
            onClick={(() => onPreviousPage())}
          >
            <img src={leftarrow} alt="" />
          </button>
          <div>
            Page
            {" "}
            {page}
            {" "}
            of
            {" "}
            {pagesCount}
          </div>
          <button
            type="button"
            className={styles.rightButton}
            onClick={(() => onNextPage())}
          >
            <img src={rightarrow} alt="" />
          </button>
        </div>
      </div>
      <Modal open={modal} onClose={toggleModal}>
        {poolForDeposit && (
        <Deposit
          onLiquidityAdded={() => {
            onPoolUpdated(poolForDeposit);
            setPoolForDeposit(null);
            toggleModal();
          }}
          pool={poolForDeposit}
        />
        )}
      </Modal>
    </>
  );
};

export default AllPools;
