import { useEffect, useState } from "react";
import { connect, useAccount } from "graz";
import { ThreeCircles } from "react-loader-spinner";
import { Tabs, Tab } from "./TabD/TabD";
import styles from "./Deposit.module.css";
import Withdraw from "./Withdraw/Withdraw";
import Farm from "./Farm/Farm";
import Dep from "./Dep/Dep";
import Unfarm from "./Unfarm/Unfarm";
import { AppStatePool } from "../../context/AppStateContext";
import {
  SWAP_POOL_INFO, USER_TOKEN_DETAILS, UserTokenDetails, useQueries,
} from "../../hooks/useQueries";
import { useChain } from "../../hooks/useChain";

export type DepositProps = {
  pool: AppStatePool;
  onLiquidityAdded: ()=>void;
};

const Deposit = ({
  onLiquidityAdded,
  pool,
}: DepositProps) => {
  const { data: account } = useAccount();
  const chain = useChain();
  const queries = useQueries();
  const [depositData, setDepositData] = useState<{
    token1: UserTokenDetails;
    token2: UserTokenDetails;
    reserve1: string;
    reserve2: string;
  }>();

  const tabs: Tab[] = [
    { id: "1", label: "deposit" },
    { id: "2", label: "withdraw" },
    { id: "3", label: "farm" },
    { id: "4", label: "unfarm" },
  ];
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  useEffect(() => {
    if (!account) {
      connect({ chain });
      return;
    }
    if (!queries) {
      return;
    }
    const fetch = async () => {
      const { query } = queries;
      const [poolInfo, ...tokens] = await Promise.all([
        query(SWAP_POOL_INFO(pool.address), { cacheTime: 1 }),
        query(USER_TOKEN_DETAILS(pool.denom1, account.bech32Address)),
        query(USER_TOKEN_DETAILS(pool.denom2, account.bech32Address)),
      ]);
      setDepositData({
        token1: tokens[0],
        token2: tokens[1],
        reserve1: poolInfo.token1_reserve,
        reserve2: poolInfo.token2_reserve,
      });
    };
    fetch();
  }, [account, queries]);

  if (!depositData) {
    return (
      <div style={{ padding: "30px" }}>
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          visible
        />
      </div>
    );
  }
  return (
    <div>
      <div className={styles.depositWindow}>
        <div className={styles.nameField}>
          {depositData.token1.symbol}
          /
          {depositData.token2.symbol}
        </div>
        <Tabs
          selectedId={selectedTabId}
          tabs={tabs}
          onClick={setSelectedTabId}
        />
        <div>
          <div>
            {selectedTabId === tabs[0].id && (
            <Dep
              onSuccess={onLiquidityAdded}
              reserve1={depositData.reserve1}
              reserve2={depositData.reserve2}
              pool={pool}
              token1={depositData.token1}
              token2={depositData.token2}
            />
            )}
            {selectedTabId === tabs[1].id && <Withdraw />}
            {selectedTabId === tabs[2].id && <Farm />}
            {selectedTabId === tabs[3].id && <Unfarm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
