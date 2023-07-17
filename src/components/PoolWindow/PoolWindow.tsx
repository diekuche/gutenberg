// libs
import { useEffect, useState } from "react";
import { connect, useAccount } from "graz";
import { ThreeCircles } from "react-loader-spinner";
// utils
import { AppStatePool } from "context/AppStateContext";
import {
  SWAP_POOL_INFO, USER_TOKEN_DETAILS, UserTokenDetails, useQueries,
} from "hooks/useQueries";
import { useChain } from "hooks/useChain";
// ui
import { Tabs, Tab } from "ui/PoolWindow/Tabs";
// styles
import styles from "./PoolWindow.module.css";
// components
import Withdraw from "./Withdraw/Withdraw";
import Farm from "./Farm/Farm";
import Deposit from "./Deposit/Deposit";
import Unfarm from "./Unfarm/Unfarm";

export type PoolWindowProps = {
  pool: AppStatePool;
  onLiquidityAdded: ()=>void;
};

const PoolWindow = ({
  onLiquidityAdded,
  pool,
}: PoolWindowProps) => {
  const { data: account } = useAccount();
  const chain = useChain();
  const queries = useQueries();
  const [depositData, setDepositData] = useState<{
    token1: UserTokenDetails;
    token2: UserTokenDetails;
    reserve1: string;
    reserve2: string;
  }>();

  const tabKeys = ["deposit", "withdraw", "farm", "unfarm"] as const;
  type TabKey = typeof tabKeys[number];

  const tabs: Tab<TabKey>[] = [
    { key: "deposit", label: "deposit" },
    { key: "withdraw", label: "withdraw" },
    // { id: "farm", label: "farm" },
    // { id: "unfarm", label: "unfarm" },
  ];
  const [selectedTabKey, setSelectedTabKey] = useState<TabKey>(tabs[0].key);

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
        <Tabs<TabKey>
          selectedId={selectedTabKey}
          tabs={tabs}
          onSelect={setSelectedTabKey}
        />
        <div>
          <div>
            {selectedTabKey === "deposit" && (
            <Deposit
              onSuccess={onLiquidityAdded}
              reserve1={depositData.reserve1}
              reserve2={depositData.reserve2}
              pool={pool}
              token1={depositData.token1}
              token2={depositData.token2}
            />
            )}
            {selectedTabKey === "withdraw" && <Withdraw />}
            {selectedTabKey === "farm" && <Farm />}
            {selectedTabKey === "unfarm" && <Unfarm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolWindow;
