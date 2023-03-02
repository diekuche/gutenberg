import React from "react";
import styles from "./SelectCustom.module.css";
import AsyncSelect from "react-select";
import { Props } from "react-select";
import classNames from "classnames";

const SelectCustom = (props: Props) => {
  const { options, placeholder, className, ...rest } = props;

  return (
    <AsyncSelect
      placeholder={placeholder}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "0px solid transparent",
          height: "50px",
          borderColor: state.isFocused ? "green" : "transparent",
          borderRadius: "28px",
          background: "rgba(22, 40, 51);",
          color: "#43b25b",
          fontSize: "18px",
          padding: "0px 26px",
          zIndex: 14,
          width: "215px",
          boxShadow: "none",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: "#43b25b",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "#43b25b",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "rgba(22, 40, 51, 0.4);",
          color: "#43b25b",
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          position: "absolute",
          zIndex: 16,
          top: "25px",
          borderRadius: "0px 0px 28px 28px",
          backgroundColor: "rgba(22, 40, 51)",
          overflow: "hidden",
          maxHeight: "auto",
          width: "215px",
        }),
        option: (provided, state) => ({
          ...provided,
          background: state.isSelected
            ? "rgba(67, 151, 178, 0.1)"
            : state.isFocused
            ? "rgba(67, 151, 178, 0.1)"
            : provided.background,
          borderRadius: "20px",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "#43b25b",
          zIndex: 15,
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: "#43b25b",
        }),
      }}
      className={classNames(styles.select_container, className)}
      classNamePrefix={styles.select}
      options={options}
      {...rest}
    />
  );
};

export default SelectCustom;
