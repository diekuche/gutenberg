import imprint from "ui/assets/Imprint.svg";
import styles from "./NTT.module.css";

const NTT = () => (
  <div className={styles.ntt}>
    <div className={styles.cs}>
      <img src={imprint} className={styles.icon} alt="NTTpreview" />
    </div>
  </div>
);

export default NTT;
