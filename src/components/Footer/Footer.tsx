import React from "react";
import styles from "../Footer/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a className={styles.link} href="/About">
        About
      </a>
      <a className={styles.link} href="/LegalInform">
        Legal Information
      </a>
      <a className={styles.link} href="URL">
        Licence
      </a>
      <div className={styles.create}>
        🟢 Powered by{" "}
        <a className={styles.linkCreate} href="URL">
          Bostrom
        </a>
      </div>
    </div>
  );
};

export default Footer;
