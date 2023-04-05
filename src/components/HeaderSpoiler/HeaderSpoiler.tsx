import styles from "./index.module.css";
import circle from "../../assets/circle.svg";
import { NavLink } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import SelectCustom from "../SelectCustom/SelectCustom";
import ChainUX from "../Chain/ChainUX";

const options = [
  {
    value: "boot",
    label: <ChainUX chainName="bostrom" icon={circle} />,
  },
  {
    value: "juno",
    label: <ChainUX chainName="juno" icon={circle} />,
  },
];

const HeaderSpoiler = () => {
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
            defaultValue={{
              value: "boot",
              label: <ChainUX chainName="bostrom" icon={circle} />,
            }}
          />
          <Wallet />
        </div>
      </div>
    </header>
  );
};

export default HeaderSpoiler;
