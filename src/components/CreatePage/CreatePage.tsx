import React, { useState, useEffect } from "react";
import styles from "./CreatePage.module.css";
import ManageTokens from "../ManageAssets/ManageAssets";
import NFT from "./NFT/NFT";
import NTT from "./NTT/NTT";
import { Tabs } from "./Tabs/Tabs";
import { Tab } from "./Tabs/Tabs";
import { Form } from "./Form/Form";
import { useAccount } from "graz";

const TokensStorageKey = "userTokens";

export const MainPage: React.FC = () => {
  const [userTokens, setUserTokens] = useState<any>(() => {
    const saved = localStorage.getItem(TokensStorageKey) as string;
    if (saved) {
      try {
        const initialValue = JSON.parse(saved);
        return initialValue || {};
      } catch (error) {
        console.log(error);
      }
    }
    return [];
  });
  const { data: account } = useAccount();

  useEffect(() => {
    localStorage.setItem(TokensStorageKey, JSON.stringify(userTokens));
  }, [userTokens]);

  const addUserToken = (contractAddress: string) => {
    const currentTokens = userTokens[account?.bech32Address!] || [];

    setUserTokens({
      ...userTokens,
      [account?.bech32Address!]: [...currentTokens, contractAddress],
    });
  };

  const removeUserToken = (contractAddress: string) => {
    const currentTokens = userTokens[account?.bech32Address!] || [];

    setUserTokens({
      ...userTokens,
      [account?.bech32Address!]: currentTokens.filter(
        (address: any) => address !== contractAddress
      ),
    });
  };

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
            {selectedTabId === tabs[0].id && (
              <Form userTokens={userTokens} addUserToken={addUserToken}></Form>
            )}
            {selectedTabId === tabs[1].id && <NFT></NFT>}
            {selectedTabId === tabs[2].id && <NTT></NTT>}
          </div>
          <ManageTokens
            userTokens={userTokens}
            addUserToken={addUserToken}
            removeUserToken={removeUserToken}
          />
        </div>
      </div>
      <div className={styles.createtext}>create!</div>
    </div>
  );
};

export default MainPage;
