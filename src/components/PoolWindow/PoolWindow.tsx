import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useChain } from "hooks/useChain";
import { Tabs, Tab } from "ui/PoolWindow/Tabs";
import { UserTokenDetails } from "types/tokens";
import { PoolDetails } from "types/pools";
import { useAccount } from "hooks/useAccount";
import { Chain } from "classes/Chain";
import { Account } from "classes/Account";
import { SWAP_POOL_INFO } from "queries/pool";
import { USER_TOKEN_DETAILS } from "queries/tokens";
import { getShortTokenName } from "utils/tokens";
import styles from "./PoolWindow.module.css";
import Withdraw from "./Withdraw/Withdraw";
import Farm from "./Farm/Farm";
import Deposit from "./Deposit/Deposit";
import Unfarm from "./Unfarm/Unfarm";

export type PoolWindowProps = {
  pool: PoolDetails;
  onLiquidityAdded: ()=>void;
};

const fetch = async (chain: Chain, account: Account, pool: PoolDetails) => {
  const [poolInfo, ...tokens] = await Promise.all([
    chain.query(SWAP_POOL_INFO(pool.address), { cacheTime: 1 }),
    chain.query(USER_TOKEN_DETAILS(pool.token1, account.address)),
    chain.query(USER_TOKEN_DETAILS(pool.token2, account.address)),
  ]);
  return {
    poolInfo,
    tokens,
  };
};

const PoolWindow = ({
  onLiquidityAdded,
  pool,
}: PoolWindowProps) => {
  const { account, connect } = useAccount();
  const chain = useChain();
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
      connect();
      return;
    }
    fetch(chain, account, pool)
      .then(({ poolInfo, tokens }) => setDepositData({
        token1: tokens[0],
        token2: tokens[1],
        reserve1: poolInfo.token1_reserve,
        reserve2: poolInfo.token2_reserve,
      }));
  }, [account, chain, pool]);

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
          {getShortTokenName(depositData.token1)}
          /
          {getShortTokenName(depositData.token2)}
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
