import React from "react";
import styles from "../Footer/Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a className={styles.link} href="/About">
        About
      </a>
      <Link className={styles.link} to="/legalinfo">
        Legal Information
      </Link>
      <a className={styles.link} href="URL">
        Licence
      </a>
      <div className={styles.create}>
        🟢 Powered by{" "}
        <a className={styles.linkCreate} href="https://cyb.ai/" target="_blank">
          Bostrom
        </a>
      </div>
    </div>
  );
};

export default Footer;
