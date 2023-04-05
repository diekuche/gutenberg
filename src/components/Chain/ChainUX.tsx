import React from "react";
import styles from "./ChainUX.module.css";
import { useSuggestChainAndConnect } from "graz";
import { CustomChains } from "../../utils/config";
import { mainnetChains } from "graz";

interface ChainProps {
  chainName: "bostrom" | "juno";
  icon: string;
}

const ChainUX: React.FC<ChainProps> = ({ chainName, icon }) => {
  const { suggestAndConnect } = useSuggestChainAndConnect();

  const getSelectedChain = () => {
    if (chainName === "bostrom") {
      return CustomChains.bostrom;
    } else if (chainName === "juno") {
      return mainnetChains.juno;
    } else {
      throw new Error(`Invalid chainName: ${chainName}`);
    }
  };

  return (
    <div
      className={styles.token}
      onClick={() =>
        suggestAndConnect({
          //@ts-ignore
          chainInfo: getSelectedChain(),
        })
      }
    >
      <img className={styles.icon} src={icon} alt={`${chainName} logo`} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{chainName}</div>
      </div>
    </div>
  );
};

export default ChainUX;
