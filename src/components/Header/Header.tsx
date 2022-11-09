import React from "react";
import styles from "./index.module.css";
import Wallet from "../Wallet/Wallet";
import { Link } from "react-router-dom";
import Help from "../Help/Help";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <Link to="/" className={styles.linkhead}>
          gutenberg!
        </Link>
        <p className={styles.description}>
          This ultra-modern technology allows to create, mint and manage any
          possible number of fungible tokens. In case of any difficulties, read
          the{" "}
          <a className={styles.link} href="URL">
            instruction
          </a>
        </p>
      </div>
      <div className={styles.help}>
        <Help />
      </div>
      <div className={styles.walletWrapper}>
        <Wallet />
      </div>
    </header>
  );
};

export default Header;
