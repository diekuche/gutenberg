import React, { useState } from "react";
import { Tabs, Tab } from "ui/CreatePage/Tabs";
import NTT from "ui/CreatePage/NTT";
import NFT from "ui/CreatePage/NFT";
import styles from "./CreatePage.module.css";
import ManageTokens from "../ManageAssets/ManageAssets";
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
            {selectedTabId === tabs[1].id && <NFT />}
            {selectedTabId === tabs[2].id && <NTT />}
          </div>
          <ManageTokens />
        </div>
      </div>
      <div className={styles.createtext}>create!</div>
    </div>
  );
};

export default MainPage;
