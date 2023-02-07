import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
<<<<<<< HEAD
import Wallet from "../Wallet/Wallet";

=======
import circle from "../../assets/circle.svg";
import downSwapArrow from "../../assets/downSwapArrow.svg";
>>>>>>> 6386fa9e40f11bf313c40b8a020b10e360a75a3b
import { Link } from "react-router-dom";

function Header2() {
  const [header, setHeader] = useState(styles.header);

  useEffect(() => {
    const listenScrollEvent = () => {
      if (window.scrollY < 50) {
        return setHeader(styles.header);
      } else if (window.scrollY > 52) {
        return setHeader(styles.header2);
      }
    };
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <header className={header}>
      <div className={styles.nav}>
        <div>
          <Link to="/" className={styles.linkHead}>
            gutenberg!
          </Link>
        </div>
        <div className={styles.middle}>
          <div>
            <Link to="/swap" className={styles.link}>
              Swap
            </Link>
          </div>
          <div className={styles.name}>
            <Link to="/old" className={styles.link}>
              Create
            </Link>
          </div>

          <div className={styles.name}>Manage assets</div>
        </div>
<<<<<<< HEAD
        <div className={styles.walletWrapper}>
          <Wallet />
=======
        <div className={styles.rightButton}>
          <button className={styles.bostrom}>
            <img src={circle} className={styles.circle} alt="" />
            Bostorm
            <img src={downSwapArrow} className={styles.downSwapArrow} alt="" />
          </button>

          <button className={styles.btnClass}>Connect Wallet</button>
>>>>>>> 6386fa9e40f11bf313c40b8a020b10e360a75a3b
        </div>
      </div>
    </header>
  );
}

export default Header2;
