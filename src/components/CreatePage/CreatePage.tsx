import { useState } from "react";
import { Tabs, Tab } from "ui/CreatePage/Tabs";
import NTT from "ui/CreatePage/NTT";
import NFT from "ui/CreatePage/NFT";
import { useChain } from "hooks/useChain";
import styles from "./CreatePage.module.css";
import ManageTokens from "../ManageAssets/ManageAssets";
import CW20TokenForm from "./CW20TokenForm/CW20TokenForm";
import FactoryTokenForm from "./FactoryTokenForm/FactoryTokenForm";

const CreatePage = () => {
  const chain = useChain();
  const tabs: Tab[] = [
    { id: "cw20", label: "Token" },
  ];
  if (chain.tokenfactoryEnabled) {
    tabs.push({
      id: "native",
      label: "Native",
    });
  }
  tabs.push({ id: "nft", label: "NFT" });
  tabs.push({ id: "ntt", label: "NTT" });
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
            {selectedTabId === "cw20" && <CW20TokenForm />}
            {selectedTabId === "native" && <FactoryTokenForm />}
            {selectedTabId === "nft" && <NFT />}
            {selectedTabId === "ntt" && <NTT />}
          </div>
          <ManageTokens />
        </div>
      </div>
      <div className={styles.createtext}>create!</div>
    </div>
  );
};

export default CreatePage;
