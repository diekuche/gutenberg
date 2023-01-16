import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Wallet from "../Wallet/Wallet";

import { Link } from "react-router-dom";

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
        <div className={styles.hero}>
          <Link to="/" className={styles.linkhead}>
            gutenberg!
          </Link>
        </div>
        <div className={styles.middle}>
          <div className={styles.name}>Create</div>
          <div className={styles.name}>Manage assets</div>
        </div>
        <div className={styles.walletWrapper}>
          <Wallet />
        </div>
      </div>
    </header>
  );
}

export default Header2;
