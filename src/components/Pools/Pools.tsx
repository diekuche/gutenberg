/* eslint-disable no-restricted-syntax */
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import styles from "./Pools.module.css";

import { useFee } from "../../utils/useFee";
import AllPools from "./AllPools";
import CreatePoolForm from "../CreatePool/CreatePoolForm/CreatePoolForm";
import Modal from "../Modal/Modal";
import { Denom } from "../../ts/SwapPoolFactory.types";
import { compareDenoms, isCw20 } from "../../utils/tokens";
import ConfirmSupply from "../CreatePool/ConfirmSupply/ConfirmSupply";
import {
  Queries,
  SWAP_POOL_INFO,
  SWAP_POOL_LIST,
  TOKEN_DETAILS,
  USER_TOKEN_DETAILS,
  UserTokenDetails, useQueries,
} from "../../hooks/useQueries";
import { AppStateContext, AppStatePool } from "../../context/AppStateContext";
import { useAddLiquidity } from "../../hooks/useAddLiquidity";
import { useContractConfig } from "../../hooks/useContractConfig";
import { useWalletContext } from "../../hooks/useWalletContext";

const Pools = () => {
  const { userTokens } = useContext(AppStateContext);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const queries = useQueries();
  const walletContext = useWalletContext();
  const { addLiquidity } = useAddLiquidity();
  const [tokens, setTokens] = useState<UserTokenDetails[]>([]);
  const [pools, setPools] = useState<AppStatePool[]>([]);
  const [loading, setLoading] = useState(true);
  const [token1, setToken1] = useState<UserTokenDetails | null>(null);
  const [token2, setToken2] = useState<UserTokenDetails | null>(null);
  const [token1Amount, setToken1Amount] = useState("0");
  const [token2Amount, setToken2Amount] = useState("0");
  const [isNewPoolOpen, setIsNewPoolOpen] = useState(false);
  const [lpFee, setLpFee] = useState(0.9);
  const [processing, setProcessing] = useState(false);
  const contractConfig = useContractConfig();
  const fee = useFee();
  const updateData = async (q: Queries, userAddress?: string) => {
    try {
      const { query } = q;
      const { pools: poolList } = await query(SWAP_POOL_LIST(
        contractConfig.factoryAddress,
      ));
      const newPools = await Promise.all(
        poolList.map(async (poolAddress, index) => {
          const poolInfo = await query(SWAP_POOL_INFO(poolAddress));
          const token1Denom = (poolInfo.token1_denom as unknown as Denom);
          const token2Denom = (poolInfo.token2_denom as unknown as Denom);
          const token1Details = await query(TOKEN_DETAILS(token1Denom));
          const token2Details = await query(TOKEN_DETAILS(token2Denom));

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
      if (userAddress) {
        const poolTokens = newPools.reduce((result, pool) => {
          if (isCw20(pool.denom1) && !result.includes(pool.denom1.cw20)) {
            result.push(pool.denom1.cw20);
          }
          if (isCw20(pool.denom2) && !result.includes(pool.denom2.cw20)) {
            result.push(pool.denom2.cw20);
          }
          return result;
        }, [] as string[]);
        const allTokens = (userTokens || []).concat(poolTokens);
        setTokens(
          await Promise.all(
            allTokens.map((tokenAddr) => query(USER_TOKEN_DETAILS({
              cw20: tokenAddr,
            }, userAddress))),
          ),
        );
      }
      setPools(newPools);
      setLoading(false);
    } catch (e) {
      console.log("Error when load info for page Pools");
      console.log(e);
      toast.error("Data fetching error, page will reload after 25 seconds");
      setTimeout(() => window.location.reload(), 25000);
    }
  };
  useEffect(() => {
    if (!queries) {
      return;
    }
    updateData(queries, walletContext?.account?.bech32Address);
  }, [contractConfig, queries, walletContext]);

  if (loading || !queries) {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <Triangle
          height="80"
          width="80"
          color="#E2FB5F"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          visible
        />
      </div>
    );
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
    if (pools.find((pool) => (
      (
        compareDenoms(pool.denom1, token1.denom)
      && compareDenoms(pool.denom2, token2.denom)
      )
    || (
      compareDenoms(pool.denom1, token2.denom)
      && compareDenoms(pool.denom2, token1.denom)
    )))) {
      toast.warn("Pool already exists, you can add liquidity", {
        autoClose: 5000,
      });
      setIsNewPoolOpen(false);
      return;
    }
    setIsNewPoolOpen(false);
    setIsDepositOpen(true);
  };
  const onPoolUpdated = () => {};
  const onPoolDeposit = async () => {
    if (!walletContext || !addLiquidity) {
      toast.error("Please, connect wallet");
      return;
    }
    if (!token1 || !token2) {
      toast.error("Tokens are required");
      return;
    }
    setProcessing(true);
    try {
      console.log("New pool attempt", {
        lpFeePercent: lpFee.toString(),
        token1Denom: token1.denom,
        token2Denom: token2.denom,
      }, fee);
      const factoryExecutor = walletContext.contracts.PoolFactoryContractFactory(
        contractConfig.factoryAddress,
      ).createExecutor(walletContext);
      const CreatePoolResponse = await factoryExecutor.createPool({
        lpFeePercent: lpFee.toString(),
        token1Denom: token1.denom,
        token2Denom: token2.denom,
      }, fee);
      console.log("CreatePoolResponse", CreatePoolResponse);
      toast.success("Pool created successfully, depositing...");
      updateData(queries);
      let poolContractAddress = "";
      for (const event of CreatePoolResponse.logs[0].events) {
        const attrIndex = event.attributes.findIndex(
          (attr) => attr.key === "code_id" && attr.value === contractConfig.swapPoolContractCodeId,
        );
        if (attrIndex > 0) {
          poolContractAddress = event.attributes[attrIndex - 1].value;
          break;
        }
      }
      if (!poolContractAddress) {
        throw new Error("Not found pool contract address");
      }
      await addLiquidity(
        poolContractAddress,
        token1,
        token1Amount,
        token2,
        token2Amount,
      );
      setIsDepositOpen(false);
      setIsNewPoolOpen(false);
      setToken1(null);
      setToken2(null);
      setToken1Amount("0");
      setToken2Amount("0");
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
    setProcessing(false);
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
          processing={processing}
          fee={lpFee}
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
          <button
            disabled={processing}
            type="button"
            className={styles.buttonCreate}
            onClick={() => setIsNewPoolOpen(true)}
          >
            create new pool!
          </button>
        </div>
        {/* <MyPools /> */}
        <AllPools onPoolUpdated={onPoolUpdated} pools={pools} />

      </div>
    </div>
  );
};

export default Pools;
