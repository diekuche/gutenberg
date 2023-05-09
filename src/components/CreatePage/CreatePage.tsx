import React, { useState } from "react";
import styles from "./CreatePage.module.css";
import ManageTokens from "../ManageAssets/ManageAssets";
import NFT from "./NFT/NFT";
import NTT from "./NTT/NTT";
import { Tabs } from "./Tabs/Tabs";
import { Tab } from "./Tabs/Tabs";
import { Form } from "./Form/Form";

export const MainPage: React.FC = () => {
  const tabs: Tab[] = [
    { id: "1", label: "Token" },
    { id: "2", label: "NFT" },
    { id: "3", label: "NTT" },
  ];
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  return (
    <div className={styles.mainpage}>
      <div className={styles.group}>
        <Tabs
          selectedId={selectedTabId}
          tabs={tabs}
          onClick={setSelectedTabId}
        />
        <div className={styles.tools}>
          <div className={styles.tabPageContent}>
            {selectedTabId === tabs[0].id && <Form />}
            {selectedTabId === tabs[1].id && <NFT></NFT>}
            {selectedTabId === tabs[2].id && <NTT></NTT>}
          </div>
          <ManageTokens />
        </div>
      </div>
      <div className={styles.createtext}>create!</div>
    </div>
  );
};

export default MainPage;
