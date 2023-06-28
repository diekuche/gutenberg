import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Pools.module.css";

import { useFee } from "../../utils/useFee";
import AllPools from "./AllPools";
import { useSwapPoolFactory } from "../../hooks/useSwapPoolFactory";
import CreatePoolForm from "../CreatePool/CreatePoolForm/CreatePoolForm";
import Modal from "../Modal/Modal";
import { Denom } from "../../ts/SwapPoolFactory.types";
import { compareDenoms } from "../../utils/tokens";
import ConfirmSupply from "../CreatePool/ConfirmSupply/ConfirmSupply";
import {
  UserTokenDetails, useQueries,
} from "../../hooks/useQueries";
import { AppStateContext, AppStatePool } from "../../context/AppStateContext";

const Pools = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const queries = useQueries();
  const { userTokens, pools: savedPools, setPools: setSavedPools } = useContext(AppStateContext);
  const [tokens, setTokens] = useState<UserTokenDetails[]>([]);
  const [pools, setPools] = useState<AppStatePool[]>([]);
  const [loading, setLoading] = useState(true);
  const [token1, setToken1] = useState<UserTokenDetails | null>(null);
  const [token2, setToken2] = useState<UserTokenDetails | null>(null);
  const [token1Amount, setToken1Amount] = useState(0);
  const [token2Amount, setToken2Amount] = useState(0);
  const [isNewPoolOpen, setIsNewPoolOpen] = useState(false);
  const [lpFee, setLpFee] = useState(1);
  const factory = useSwapPoolFactory();
  const fee = useFee();

  useEffect(() => {
    if (!factory || !queries) {
      return;
    }
    const fetchTokens = async () => {
      setTokens(
        await Promise.all(
          (userTokens || []).map((tokenAddr) => queries.USER_TOKEN_DETAILS({
            cw20: tokenAddr,
          })),
        ),
      );
    };
    const fetchPools = async () => {
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
    };
    Promise.all([fetchPools(), fetchTokens()]).then(() => setLoading(false)).catch((e) => {
      console.log("Error when load info for page Pools");
      console.log(e);
      toast.error("Data fetching error, page will reload after 5 seconds");
      setTimeout(() => window.location.reload(), 5000);
    });
  }, [factory, queries]);

  if (loading || !factory || !queries) {
    return <p>Loading...</p>;
  }

  const onNewPoolSubmit = async () => {
    if (!token1 || !token2) {
      toast.error("Tokens are required");
      return;
    }
    const denomsAreEqual = compareDenoms(token1.denom, token2.denom);
    if (denomsAreEqual) {
      toast.error("Error: Tokens are equal", {
        autoClose: 5000,
      });
      return;
    }
    setIsNewPoolOpen(false);
    setIsDepositOpen(true);
  };
  const onPoolDeposit = async () => {
    if (!token1 || !token2) {
      toast.error("Tokens are required");
      return;
    }
    try {
      console.log("New pool attempt", {
        lpFeePercent: lpFee.toString(),
        token1Denom: token1.denom,
        token2Denom: token2.denom,
      }, fee);
      const CreatePoolResponse = await factory.executor.createPool({
        lpFeePercent: lpFee.toString(),
        token1Denom: token1.denom,
        token2Denom: token2.denom,
      }, fee);
      console.log("CreatePoolResponse", CreatePoolResponse);
    } catch (e) {
      console.log("Error when try to create pool");
      console.log(e);
      let message = "Unknown error";
      if ((e as Error).toString().includes("Pool already exists")) {
        message = "Pool already exists";
      }
      toast.error(message);
    }
    setIsDepositOpen(false);
  };

  return (
    <div>
      <Modal open={isNewPoolOpen} onClose={() => setIsNewPoolOpen(false)}>
        <CreatePoolForm
          token1Amount={token1Amount}
          token2Amount={token2Amount}
          setToken1Amount={setToken1Amount}
          setToken2Amount={setToken2Amount}
          token1={token1}
          token2={token2}
          lpFee={lpFee}
          setLpFee={setLpFee}
          setToken1={setToken1}
          setToken2={setToken2}
          onSubmit={onNewPoolSubmit}
          tokens={tokens}
        />
      </Modal>
      <Modal open={isDepositOpen} onClose={() => setIsDepositOpen(false)}>
        {isDepositOpen && token1 && token2 && (
        <ConfirmSupply
          token1={token1}
          token2={token2}
          token1Amount={token1Amount}
          token2Amount={token2Amount}
          onSubmit={onPoolDeposit}
        />
        )}
      </Modal>

      <div className={styles.main}>
        <div className={styles.firstString}>
          <div className={styles.name}>pools!</div>
          <button type="button" className={styles.buttonCreate} onClick={() => setIsNewPoolOpen(true)}>
            create new pool!
          </button>
        </div>
        {/* <MyPools /> */}
        <AllPools pools={pools} />

      </div>
    </div>
  );
};

export default Pools;
