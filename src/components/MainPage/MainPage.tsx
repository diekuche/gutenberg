import React, { useState } from "react";
import styles from "./index.module.css";
import ManageTokens from "../ManageTokens/ManageTok";
import NFT from "../NFT/NFT";
import { Tabs } from "../Tabs/Tabs";
import { Tab } from "../Tabs/Tabs";
import { Form } from "../Form/Form";

type MainProps = {};
export const MainPage: React.FC = (props: MainProps) => {
  const tabs: Tab[] = [
    { id: "1", label: "Token" },
    { id: "2", label: "NFT" },
  ];
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const handleTabClick = (id: string | number) => {
    setSelectedTabId(id);
  };

  return (
    <div className={styles.mainpage}>
      <div className={styles.group}>
        <Tabs selectedId={selectedTabId} tabs={tabs} onClick={handleTabClick} />
        <div className={styles.tools}>
          <div className={styles.tabPageContent}>
            {selectedTabId === tabs[0].id && <Form></Form>}
            {selectedTabId === tabs[1].id && <NFT></NFT>}
          </div>
          <ManageTokens />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
