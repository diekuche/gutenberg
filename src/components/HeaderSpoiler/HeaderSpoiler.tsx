import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import circle from "../../assets/circle.svg";
import { NavLink } from "react-router-dom";
import Wallet from "../Wallet/Wallet";
import SelectCustom from "../SelectCustom/SelectCustom";
import ChainUX from "../Chain/ChainUX";

const options = [
  {
    value: "boot",
    label: <ChainUX chainName="Bostrom" icon={circle} />,
  },
  {
    value: "juno",
    label: <ChainUX chainName="Juno" icon={circle} />,
  },
];

function Header2() {
  const [header, setHeader] = useState(styles.header);

  useEffect(() => {
    const listenScrollEvent = () => {
      if (window.scrollY < 50) {
        return setHeader(styles.header);
      } else if (window.scrollY > 52) {
        return setHeader(styles.header2);
      }
    };
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <header className={header}>
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
              to="/create"
              className={(link) =>
                link.isActive ? styles.active : styles.link
              }
            >
              Create
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
          />
          <Wallet />
        </div>
      </div>
    </header>
  );
}

export default Header2;
