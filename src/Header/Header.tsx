import React from "react";
import styles from "./index.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>gutenberg!</h1>
      <p className={styles.descript}>
        This ultra-modern technology allows to create, mint and manage any possible number of fungible tokens.
        In case of any difficulties, read the <a className={styles.link} href="URL">instruction</a>
      </p>
    </header>
  );
};

export default Header;
