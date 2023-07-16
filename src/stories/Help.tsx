import { Link } from "react-router-dom";
import styles from "./Help.module.css";

const Help = () => (
  <div className={styles.help}>
    <Link className={styles.helplink} to="/Help">
      Help
    </Link>
  </div>
);

export default Help;
