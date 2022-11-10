import React from "react";
import styles from "../Help/Help.module.css";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className={styles.help}>
      <Link className={styles.helplink} to="/Help">
        Help
      </Link>
    </div>
  );
};

export default Help;
