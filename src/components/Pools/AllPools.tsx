import {
  useContext, useEffect, useRef, useState,
} from "react";
import styles from "./Pools.module.css";
import circle from "../../assets/circle.svg";
import atom from "../../assets/atom.svg";
import leftarrow from "../../assets/greyArrowLeft.svg";
import rightarrow from "../../assets/greyArrowRight.svg";
import greyArrowDown from "../../assets/greyArrowDown.svg";
import Deposit from "../Deposit/Deposit";

import Modal from "../Modal/Modal";
import { AppState, AppStateContext, AppStatePool } from "../../context/AppStateContext";
import { Denom } from "../../ts/SwapPoolFactory.types";
import { useQueries } from "../../hooks/useQueries";

const AllPools = () => {
  const [loading, setLoading] = useState(true);
  const [poolForDeposit, setPoolForDeposit] = useState<AppStatePool | null>(null);
  const initialized = useRef(false);
  const [modal, setModal] = useState(false);
  const [pools, setPools] = useState<AppState["pools"]>([]);
  const { pools: savedPools, setPools: setSavedPools } = useContext(AppStateContext);

  const queries = useQueries();

  const toggleModal = () => {
    setModal(!modal);
  };

  const onPoolDeposit = (pool: AppStatePool) => {
    setPoolForDeposit(pool);
    setModal(true);
  };

  useEffect(() => {
    if (!queries) {
      return;
    }
    const fetch = async () => {
      const { pools: poolList } = await queries.SWAP_POOL_LIST();
      const updatedPools = await Promise.all(
        poolList.slice(savedPools.length).map(async (poolAddress, index) => {
          const poolInfo = await queries.SWAP_POOL_INFO(poolAddress);
          const token1Denom = (poolInfo.token1_denom as unknown as Denom);
          const token2Denom = (poolInfo.token1_denom as unknown as Denom);
          if ("native" in token1Denom || "native" in token2Denom) {
            throw new Error("Unsupported native token");
          }

          const token1Addr = token1Denom.cw20;
          const token2Addr = token2Denom.cw20;
          const token1Details = await queries.CW20_TOKEN_DETAILS(token1Addr);
          const token2Details = await queries.CW20_TOKEN_DETAILS(token2Addr);

          return {
            address: poolAddress,
            index,
            denom1: token1Denom,
            denom2: token2Denom,
            symbol1: token1Details.symbol,
            symbol2: token2Details.symbol,
            logo1: token1Details.logo,
            logo2: token2Details.logo,
          };
        }),
      );
      const newPools = [...savedPools, ...updatedPools];
      setSavedPools(newPools);
      setPools(newPools);

      setLoading(false);
    };
    if (!initialized.current) {
      initialized.current = true;
      fetch();
    }
  }, [queries]);

  if (loading) {
    return <p>Loading...</p>;
  }
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
