import React from "react";
import styles from "./Search.module.css";
import filter from "../../../assets/filter.svg";

const Search = () => {
  return (
    <div className={styles.search}>
      <img src={filter} alt=""></img>
      <div className={styles.text}>Search</div>
    </div>
  );
};

export default Search;
