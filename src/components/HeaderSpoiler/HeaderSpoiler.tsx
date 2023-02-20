import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import circle from "../../assets/circle.svg";
import downSwapArrow from "../../assets/downSwapArrow.svg";
import { NavLink } from "react-router-dom";
import Wallet from "../Wallet/Wallet";

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
          <button className={styles.bostrom}>
            <img src={circle} className={styles.circle} alt="" />
            Bostorm
            <img src={downSwapArrow} className={styles.downSwapArrow} alt="" />
          </button>

          <Wallet />
        </div>
      </div>
    </header>
  );
}

export default Header2;
