import React from "react";
import styles from "./index.module.css";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <Link to="/" className={styles.linkhead}>
          gutenberg!
        </Link>
      </div>
      <div className={styles.middle}>
        <div className={styles.name}>Create</div>
        <div className={styles.name}>Manage assets</div>
      </div>
      <button className={styles.btnClass}>Enter App</button>
    </header>
  );
};

export default Header;
