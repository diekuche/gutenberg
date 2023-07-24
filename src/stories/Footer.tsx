import { Link } from "react-router-dom";
import git from "ui/assets/github.svg";
import styles from "./Footer.module.css";

const Footer = () => (
  <div className={styles.footer}>
    <a
      href="https://github.com/diekuche/gutenberg"
      target="_blank"
      rel="noreferrer"
    >
      <img className={styles.git} src={git} alt="" />
    </a>
    <a className={styles.link} href="https://en.wikipedia.org/wiki/Johannes_Gutenberg">
      About
    </a>
    <Link className={styles.link} to="/legalinfo">
      Terms of Use
    </Link>
    <Link className={styles.link} to="/license">
      License
    </Link>
    <div className={styles.create}>
      🟢 Powered by
      {" "}
      <a
        className={styles.linkCreate}
        href="https://cyb.ai/"
        target="_blank"
        rel="noreferrer"
      >
        Bostrom AI
      </a>
    </div>
  </div>
);

export default Footer;
