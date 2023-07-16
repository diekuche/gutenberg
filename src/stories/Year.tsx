import styles from "./Year.module.css";

const Year = () => (
  <div className={styles.year}>
    <div className={styles.yearDown}>
      2024
      <div className={styles.yearUp}>2023</div>
    </div>
  </div>
);

export default Year;
