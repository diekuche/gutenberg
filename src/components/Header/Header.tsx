import React from "react";
import styles from "./index.module.css";
import { GrazProvider } from "graz";
import Wallet from '../Wallet/Wallet';
import { Bostrom } from '../../utils/wallet';

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
        <GrazProvider
          grazOptions={{
            defaultChain: Bostrom.cosmos,
          }}
        >
          <Wallet />
        </GrazProvider>
      </div>
    </header>
  );
};

export default Header;
