import React from "react";
import styles from "./index.module.css";
import Wallet from '../Wallet/Wallet';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <div className={styles.h1}>gutenberg!</div>
        <p className={styles.description}>
          This ultra-modern technology allows to create, mint and manage any possible number of fungible tokens.
          In case of any difficulties, read the <a className={styles.link} href="URL">instruction</a>
        </p>
      </div>
      <div className={styles.walletWrapper}>
          <Wallet />
      </div>
    </header>
  );
};

export default Header;
