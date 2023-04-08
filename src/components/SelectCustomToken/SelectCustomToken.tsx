import React from "react";
import styles from "./SelectCustomToken.module.css";
import AsyncSelect from "react-select";
import { Props } from "react-select";
import classNames from "classnames";

interface SelectCustomProps extends Props {
  height?: number;
  fontSize?: number;
}

const SelectCustom = (props: SelectCustomProps) => {
  const {
    options,
    placeholder,
    className,
    height = 50,
    fontSize = 18,
    ...rest
  } = props;

  return (
    <AsyncSelect
      placeholder={placeholder}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "none",
          height: `${height}px`,
          borderColor: state.isFocused ? "green" : "transparent",
          borderRadius: "8px",
          background: "transparent",
          color: "#F6F8FE",
          fontSize: "20px",
          zIndex: 14,
          width: "100%",
          boxShadow: "none",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: "#F6F8FE",
          fontSize: `${fontSize}px`,
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          margin: "0px",
          padding: "0px",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "#E2FB5F",
          padding: "0px",
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
          top: "0px",
          borderRadius: "12px",
          backgroundColor: "rgba(6, 15, 25)",
          overflow: "hidden",
          minHeight: "420px",
          minWidth: "474px",
          transition: "opacity 2s",
          border: "none",
          boxShadow: "none",
          padding: "34px",
          marginTop: "-46px",
          marginRight: "-43px",

        }),
        option: (provided, state) => ({
          ...provided,
          background: state.isSelected
            ? "rgba(67, 151, 178, 0.1)"
            : state.isFocused
              ? "rgba(67, 151, 178, 0.1)"
              : provided.background,
          borderRadius: "8px",
          border: "none",
          padding: "10px",
          margin: "4px 0px",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "#F6F8FE",
          zIndex: 15,
          margin: "0px"
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
