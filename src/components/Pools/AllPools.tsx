import {
  useEffect,
  useState,
} from "react";
import Modal from "ui/Modal";
import { PoolDetails } from "types/pools";
import { getShortTokenName, searchInToken } from "utils/tokens";
import styles from "./Pools.module.css";
import circle from "../../assets/circle.svg";
import atom from "../../assets/atom.svg";
import leftarrow from "../../assets/greyArrowLeft.svg";
import rightarrow from "../../assets/greyArrowRight.svg";
import greyArrowDown from "../../assets/greyArrowDown.svg";
import PoolWindow from "../PoolWindow/PoolWindow";

const PAGE_SIZE = 10;

type AllPoolsProps = {
  pools: PoolDetails[];
  onPoolUpdated: (pool: PoolDetails)=> void;
};

const AllPools = ({
  onPoolUpdated,
  pools: nonFilteredPools,
}: AllPoolsProps) => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [poolForDeposit, setPoolForDeposit] = useState<PoolDetails | null>(null);
  const [modal, setModal] = useState(false);
  const pools = (
    filter
      ? nonFilteredPools.filter(
        (pool) => searchInToken(pool.token1, filter)
        || searchInToken(pool.token2, filter),
      )
      : nonFilteredPools
  );
  const pagesCount = Math.ceil(pools.length / PAGE_SIZE);

  const toggleModal = () => {
    setModal(!modal);
  };
  useEffect(() => {
    setPage(1);
  }, [filter]);

  const onPoolDeposit = (pool: PoolDetails) => {
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
                      <div className={styles.pair}>
                        {`${getShortTokenName(pool.token1)}/${getShortTokenName(pool.token2)}`}

                      </div>
                    </div>
                  </td>
                  <td className={styles.ARP}>
                    {(Math.random() * 100).toFixed(2)}
                    %
                  </td>
                  <td>$0</td>
                  <td className={styles.volume}>$0</td>
                </tr>
              ))}
          </tbody>
        </table>
        {pagesCount > 0 && (
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
        )}
      </div>
      <Modal open={modal} onClose={toggleModal}>
        {poolForDeposit && (
        <PoolWindow
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
