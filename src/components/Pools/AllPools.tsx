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
import { useSwapPoolFactory } from "../../hooks/useSwapPoolFactory";
import { AppState, AppStateContext } from "../../context/AppStateContext";
import { useSwapPoolContractFactory } from "../../hooks/useSwapPool";
import { Denom } from "../../ts/SwapPoolFactory.types";
import { useCw20ContractFactory } from "../../hooks/useCw20";

const AllPools = () => {
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [modal, setModal] = useState(false);
  const [pools, setPools] = useState<AppState["pools"]>([]);
  const { pools: savedPools, setPools: setSavedPools } = useContext(AppStateContext);

  const factory = useSwapPoolFactory();
  const PoolContractFactory = useSwapPoolContractFactory();
  const Cw20ContractFactory = useCw20ContractFactory();

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (!factory || !PoolContractFactory || !Cw20ContractFactory) {
      return;
    }
    const fetch = async () => {
      const { pools: poolList } = await factory.querier.getPools();
      const updatedPools = await Promise.all(
        poolList.slice(savedPools.length).map(async (poolAddress, index) => {
          const { querier } = PoolContractFactory(poolAddress);
          const info = await querier.info();
          const token1Addr = (info.token1_denom as unknown as { cw20: string }).cw20;
          const token2Addr = (info.token2_denom as unknown as { cw20: string }).cw20;
          const token1 = Cw20ContractFactory(token1Addr);
          const token1Info = await token1.querier.tokenInfo();
          const token2 = Cw20ContractFactory(token2Addr);
          const token2Info = await token2.querier.tokenInfo();
          return {
            address: poolAddress,
            index,
            denom1: info.token1_denom as unknown as Denom,
            denom2: info.token2_denom as unknown as Denom,
            symbol1: token1Info.symbol,
            symbol2: token2Info.symbol,
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
  }, [factory]);

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
              <tr key={pool.index} onClick={toggleModal}>
                <td className={styles.pairwidth}>
                  {modal && (
                  <div className={styles.content}>
                    <div className={styles.overlay} />
                    <Deposit />
                  </div>
                  )}
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
        <Deposit />
      </Modal>
    </>
  );
};

export default AllPools;
