import filter from "ui/assets/filter.svg";
import styles from "./SearchLabel.module.css";

const SearchLabel = () => (
  <div className={styles.search}>
    <img src={filter} alt="" />
    <div className={styles.text}>Search</div>
  </div>
);

export default SearchLabel;
