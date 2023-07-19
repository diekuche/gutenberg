/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import Modal from "ui/Modal";
import { useChain } from "hooks/useChain";
import { PoolDenom, UserTokenDetails } from "types/tokens";
import { comparePoolDenoms, isCw20, nativeTokenDetails } from "utils/tokens";
import { Chain } from "classes/Chain";
import { SWAP_POOL_INFO, SWAP_POOL_LIST } from "queries/pool";
import { TOKEN_DETAILS, USER_TOKEN_DETAILS } from "queries/tokens";
import { ADD_LIQUIDITY, CREATE_POOL } from "mutations/pool";
import { useAccount } from "hooks/useAccount";
import { Account } from "classes/Account";
import { PoolDetails } from "types/pools";
import styles from "./Pools.module.css";

import AllPools from "./AllPools";
import CreatePoolForm from "../CreatePool/CreatePoolForm/CreatePoolForm";
import ConfirmSupply from "../CreatePool/ConfirmSupply/ConfirmSupply";

const fetchData = async (
  chain: Chain,
  account: Account | undefined,
  userTokens: string[],
) => {
  const { pools: poolList } = await chain.query(SWAP_POOL_LIST(
    chain.cosmwasmConfigs.factoryAddress,
  ));
  const newPools = await Promise.all(
    poolList.map(async (poolAddress, index) => {
      const poolInfo = await chain.query(SWAP_POOL_INFO(poolAddress));
      const token1Denom = (poolInfo.token1_denom as unknown as PoolDenom);
      const token2Denom = (poolInfo.token2_denom as unknown as PoolDenom);
      const token1Details = await chain.query(TOKEN_DETAILS(token1Denom));
      const token2Details = await chain.query(TOKEN_DETAILS(token2Denom));

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
  let tokens: UserTokenDetails[] = [];
  if (account) {
    const { address } = account;
    const poolTokens = newPools.reduce((result, pool) => {
      if (isCw20(pool.denom1) && !result.includes(pool.denom1.cw20)) {
        result.push(pool.denom1.cw20);
      }
      if (isCw20(pool.denom2) && !result.includes(pool.denom2.cw20)) {
        result.push(pool.denom2.cw20);
      }
      return result;
    }, [] as string[]);

    const bank = await chain.bank();
    const nativeTokens = await bank.denomsMetadata();
    const nativeBalances = await bank.allBalances(address);
    const nativeUserTokens: UserTokenDetails[] = nativeTokens.map((nativeToken) => {
      const detail = nativeTokenDetails(nativeToken);
      return {
        ...detail,
        balance: nativeBalances.find((b) => b.denom === nativeToken.denomUnits[0].denom)?.amount || "0",
      };
    });

    const allTokens = (userTokens || []).concat(poolTokens);
    const allCw20Tokens = (
      await Promise.all(
        allTokens.map((tokenAddr) => chain.query(USER_TOKEN_DETAILS({
          cw20: tokenAddr,
        }, address))),
      )
    );

    tokens = allCw20Tokens.concat(nativeUserTokens);
  }

  return {
    tokens,
    pools: newPools,
  };
};

const Pools = () => {
  const chain = useChain();
  const { account } = useAccount();

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [tokens, setTokens] = useState<UserTokenDetails[]>([]);
  const [pools, setPools] = useState<PoolDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [token1, setToken1] = useState<UserTokenDetails | null>(null);
  const [token2, setToken2] = useState<UserTokenDetails | null>(null);
  const [token1Amount, setToken1Amount] = useState("0");
  const [token2Amount, setToken2Amount] = useState("0");
  const [isNewPoolOpen, setIsNewPoolOpen] = useState(false);
  const [lpFee, setLpFee] = useState(0.9);
  const [processing, setProcessing] = useState(false);

  const updateData = () => {
    fetchData(chain, account, [])
      .then(({ pools: newPools, tokens: newTokens }) => {
        setPools(newPools);
        if (newTokens) {
          setTokens(newTokens);
        }
      }).catch((e) => {
        console.log("Error when load info for page Pools");
        console.log(e);
        toast.error("Data fetching error, page will reload after 25 seconds");
        setTimeout(() => window.location.reload(), 25000);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    updateData();
  }, [chain, account]);

  if (loading) {
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
    const denomsAreEqual = comparePoolDenoms(token1.denom, token2.denom);
    if (denomsAreEqual) {
      toast.error("Error: Tokens are equal", {
        autoClose: 5000,
      });
      return;
    }
    if (pools.find((pool) => (
      (
        comparePoolDenoms(pool.denom1, token1.denom)
      && comparePoolDenoms(pool.denom2, token2.denom)
      )
    || (
      comparePoolDenoms(pool.denom1, token2.denom)
      && comparePoolDenoms(pool.denom2, token1.denom)
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
    if (!account) {
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
      });
      const CreatePoolResponse = await CREATE_POOL(account, lpFee, token1.denom, token2.denom);
      console.log("CreatePoolResponse", CreatePoolResponse);
      toast.success("Pool created successfully, depositing...");
      updateData();
      let poolContractAddress = "";
      for (const event of CreatePoolResponse.logs[0].events) {
        const attrIndex = event.attributes.findIndex(
          (attr) => attr.key === "code_id" && attr.value === chain.cosmwasmConfigs.swapPoolContractCodeId,
        );
        if (attrIndex > 0) {
          poolContractAddress = event.attributes[attrIndex - 1].value;
          break;
        }
      }
      if (!poolContractAddress) {
        throw new Error("Not found pool contract address");
      }
      await ADD_LIQUIDITY(
        account,
        poolContractAddress,
        token1,
        token1Amount,
        token2,
        token2Amount,
      );
      toast.success("Liquidity was added");
      updateData();

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
