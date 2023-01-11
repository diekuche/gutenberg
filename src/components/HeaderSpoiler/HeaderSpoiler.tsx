import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

import { Link } from "react-router-dom";

function Header2() {
  const [header, setHeader] = useState("header");

  const listenScrollEvent = () => {
    if (window.scrollY < 50) {
      return setHeader(styles.header);
    } else if (window.scrollY > 52) {
      return setHeader(styles.header2);
    }
  };

  useEffect(() => {
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
        <button className={styles.btnClass}>Connect Wallet</button>
      </div>
    </header>
  );
}

export default Header2;
