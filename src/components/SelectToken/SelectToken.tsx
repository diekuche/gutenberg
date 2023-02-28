import React from "react";
import Select from "react-select";
import styles from "../SelectToken/SelectToken.module.css";
import "./react-select.scss";
import Boot from "../Boot/Boot";
import Pig from "../Pig/Pig";

const options = [
  {
    value: "boot",
    label: <Boot />,
  },
  { value: "pig", label: <Pig /> },
  {
    value: "shit",
    label: "SHIT",
  },
  {
    value: "ps",
    label: "PS",
  },
  {
    value: "mew",
    label: "MEW",
  },
];

const SelectToken = () => {
  return (
    <div className={styles.choice}>
      <h3>Choice token</h3>
      <Select
        options={options}
        placeholder="Select token"
        classNamePrefix="select-react"
        className={styles.select}
      />
    </div>
  );
};

export default SelectToken;
