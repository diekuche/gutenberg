import React, { useState } from "react";
import { Tabs, Tab } from "./TabD/TabD";
import styles from "./Deposit.module.css";
import Withdraw from "./Withdraw/Withdraw";
import Farm from "./Farm/Farm";
import Dep from "./Dep/Dep";
import Unfarm from "./Unfarm/Unfarm";
import { AppStatePool } from "../../context/AppStateContext";

export type DepositProps = {
  pool: AppStatePool
};

const Deposit = ({
  pool,
}: DepositProps) => {
  const tabs: Tab[] = [
    { id: "1", label: "deposit" },
    { id: "2", label: "withdraw" },
    { id: "3", label: "farm" },
    { id: "4", label: "unfarm" },
  ];
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  return (
    <div>
      <div className={styles.depositWindow}>
        <div className={styles.nameField}>Boot/Pig</div>
        <Tabs
          selectedId={selectedTabId}
          tabs={tabs}
          onClick={setSelectedTabId}
        />
        <div>
          <div>
            {selectedTabId === tabs[0].id && <Dep pool={pool} />}
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
