import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import ManageTokens from "../ManageTokens/ManageTok";
import NFT from "../NFT/NFT";
import { Tabs } from "../Tabs/Tabs";
import { Tab } from "../Tabs/Tabs";
import { Form } from "../Form/Form";
import Header from "../Header/Header";

export const MainPage: React.FC = () => {
  const [initial, setInitial] = useState<string[]>(() => {
    const saved = localStorage.getItem("contract") as string;
    if (saved) {
      try {
        const initialValue = JSON.parse(saved);
        return initialValue || [];
      } catch (error) {
        console.log(error);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("contract", JSON.stringify(initial));
  }, [initial]);

  const tabs: Tab[] = [
    { id: "1", label: "Token" },
    { id: "2", label: "NFT" },
  ];
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  return (
    
    <div className={styles.mainpage}>
      <Header/>
      <div className={styles.group}>
        <Tabs
          selectedId={selectedTabId}
          tabs={tabs}
          onClick={setSelectedTabId}
        />
        <div className={styles.tools}>
          <div className={styles.tabPageContent}>
            {selectedTabId === tabs[0].id && (
              <Form initial={initial} setInitial={setInitial}></Form>
            )}
            {selectedTabId === tabs[1].id && <NFT></NFT>}
          </div>
          <ManageTokens initial={initial} setInitial={setInitial} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
