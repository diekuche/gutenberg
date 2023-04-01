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
      <NavLink
        to="/About"
        className={(link) => (link.isActive ? styles.active : styles.link)}
      >
        About
      </NavLink>
      <NavLink
        className={(link) => (link.isActive ? styles.active : styles.link)}
        to="/legalinfo"
      >
        Legal Information
      </NavLink>
      <NavLink
        className={(link) => (link.isActive ? styles.active : styles.link)}
        to="URL"
      >
        Licence
      </NavLink>
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
