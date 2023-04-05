import styles from "./index.module.css";
import { useState } from "react";
import circle from "../../assets/circle.svg";
import { NavLink } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import SelectCustom from "../SelectCustom/SelectCustom";
import ChainUX from "../Chain/ChainUX";

const HeaderSpoiler = () => {
  const [selectedChain, setSelectedChain] = useState<"bostrom" | "juno">(
    "bostrom"
  );

  const renderChainOption = (chain: "bostrom" | "juno") => {
    const handleClick = () => {
      setSelectedChain(chain);
    };

    return (
      <div onClick={handleClick}>
        <ChainUX chainName={chain} icon={circle} />
      </div>
    );
  };

  const options = [
    {
      value: "bostrom",
      label: renderChainOption("bostrom"),
    },
    {
      value: "juno",
      label: renderChainOption("juno"),
    },
  ];

  const defaultValue = options[0];

  return (
    <header>
      <div className={styles.nav}>
        <div>
          <NavLink to="/" className={styles.linkHead}>
            gutenberg!
          </NavLink>
        </div>
        <div className={styles.middle}>
          <div>
            <NavLink
              to="/swap"
              className={(link) =>
                link.isActive ? styles.active : styles.link
              }
            >
              Swap
            </NavLink>
          </div>
          <div className={styles.name}>
            <NavLink
              to="/pools"
              className={(link) =>
                link.isActive ? styles.active : styles.link
              }
            >
              Pools
            </NavLink>
          </div>
          <div className={styles.name}>
            <NavLink
              to="/create"
              className={(link) =>
                link.isActive ? styles.active : styles.link
              }
            >
              Create token
            </NavLink>
          </div>

          <div className={styles.name}>
            <NavLink
              to="/manage-assets"
              className={(link) =>
                link.isActive ? styles.active : styles.link
              }
            >
              Manage assets
            </NavLink>
          </div>
        </div>
        <div className={styles.rightButton}>
          <SelectCustom
            options={options}
            height={45}
            placeholder="select chain"
            fontSize={16}
            defaultValue={defaultValue}
          />
          <Wallet />
        </div>
      </div>
    </header>
  );
};

export default HeaderSpoiler;
