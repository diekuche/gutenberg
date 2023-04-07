import styles from "./index.module.css";
import { NavLink } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import SelectCustom from "../SelectCustom/SelectCustom";
import { CustomChains } from "../../utils/config";
import { mainnetChains, useSuggestChainAndConnect, useActiveChain } from "graz";
import ChainUX from "../Chain/ChainUX";

const options = [
  {
    value: CustomChains.bostrom,
    label: <ChainUX chainName="Bostrom" />,
  },
  {
    value: mainnetChains.juno,
    label: <ChainUX chainName="Juno" />,
  },
];

const HeaderSpoiler = () => {
  const { suggestAndConnect } = useSuggestChainAndConnect();
  const activeChain = useActiveChain();
  const defaultValue =
    options.find((option) => option.value.chainId === activeChain?.chainId) ||
    options[0];

  const handleSelect = ({ value }: any) => {
    suggestAndConnect({ chainInfo: value });
  };

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
            onChange={handleSelect}
          />
          <Wallet />
        </div>
      </div>
    </header>
  );
};

export default HeaderSpoiler;
