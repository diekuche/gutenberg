import React from "react";
import styles from "./ChainUX.module.css";
import { useSuggestChainAndConnect } from "graz";
import { bostrom, juno } from "graz/chains";

interface ChainProps {
  chainName: "bostrom" | "juno";
  icon: string;
}

const ChainUX: React.FC<ChainProps> = ({ chainName, icon }) => {
  const { suggestAndConnect } = useSuggestChainAndConnect();

  const getSelectedChain = () => {
    if (chainName === "bostrom") {
      return bostrom;
    } else if (chainName === "juno") {
      return juno;
    } else {
      throw new Error(`Invalid chainName: ${chainName}`);
    }
  };

  return (
    <div
      className={styles.token}
      onClick={() =>
        suggestAndConnect({
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
