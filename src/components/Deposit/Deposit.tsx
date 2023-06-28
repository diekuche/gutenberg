import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "./TabD/TabD";
import styles from "./Deposit.module.css";
import Withdraw from "./Withdraw/Withdraw";
import Farm from "./Farm/Farm";
import Dep from "./Dep/Dep";
import Unfarm from "./Unfarm/Unfarm";
import { AppStatePool } from "../../context/AppStateContext";
import { UserTokenDetails, useQueries } from "../../hooks/useQueries";

export type DepositProps = {
  pool: AppStatePool;
  onLiquidityAdded: ()=>void;
};

const Deposit = ({
  onLiquidityAdded,
  pool,
}: DepositProps) => {
  const { queries } = useQueries();
  const [token1, setToken1] = useState<UserTokenDetails>();
  const [token2, setToken2] = useState<UserTokenDetails>();
  const [token1ForToken2Price, setToken1ForToken2Price] = useState<string | undefined>();
  const tabs: Tab[] = [
    { id: "1", label: "deposit" },
    { id: "2", label: "withdraw" },
    { id: "3", label: "farm" },
    { id: "4", label: "unfarm" },
  ];
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  useEffect(() => {
    if (!queries) {
      return;
    }
    const fetch = async () => {
      const data = await Promise.all([
        queries.USER_TOKEN_DETAILS(pool.denom1),
        queries.USER_TOKEN_DETAILS(pool.denom2),
        queries.POOL_TOKEN1_FOR_TOKEN2_PRICE(pool.address, "1"),
      ]);
      setToken1(data[0]);
      setToken2(data[1]);
      setToken1ForToken2Price(data[2]);
    };
    fetch();
  }, [queries]);

  if (!token1 || !token2 || !token1ForToken2Price) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className={styles.depositWindow}>
        <div className={styles.nameField}>
          {token1.symbol}
          /
          {token2.symbol}
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
              token1ForToken2Price={token1ForToken2Price}
              pool={pool}
              token1={token1}
              token2={token2}
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
