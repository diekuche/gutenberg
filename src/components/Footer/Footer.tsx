import React from "react";
import styles from "../Footer/Footer.module.css";
import { Link } from "react-router-dom";
import git from "../../assets/github.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a
        href="https://github.com/diekuche/gutenberg"
        target="_blank"
        rel="noreferrer"
      >
        <img className={styles.git} src={git} alt=""></img>
      </a>
      <a href="/About" className={styles.link}>
        About
      </a>
      <a className={styles.link} href="/legalinfo">
        Legal Information
      </a>
      <a className={styles.link} href="URL">
        Licence
      </a>
      <div className={styles.create}>
        🟢 Powered by{" "}
        <a
          className={styles.linkCreate}
          href="https://cyb.ai/"
          target="_blank"
          rel="noreferrer"
        >
          Bostrom
        </a>
      </div>
    </div>
  );
};

export default Footer;
