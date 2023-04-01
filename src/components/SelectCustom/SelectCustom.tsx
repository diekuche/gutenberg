import React from "react";
import styles from "./SelectCustom.module.css";
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
          borderRadius: state.menuIsOpen ? "28px 28px 0px 0px" : "28px",
          background: "rgba(22, 40, 51);",
          color: "#43b25b",
          fontSize: "18px",
          alignItems: "center",
          zIndex: 14,
          width: "198px",
          maxWidth: "198px",
          boxShadow: "none",
          paddingLeft: "8px",
          transition: "border-radius 0.3s",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: "#43b25b",
          fontSize: `${fontSize}px`,
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          margin: "0px",
          padding: "0px",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "#43b25b",
          padding: "0px 24px 0px 0px",
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
          width: "auto",
          maxWidth: "198px",
          transition: "opacity 2s",
          border: "none",
          boxShadow: "none",
          padding: "5px",
          alignItems: "center",
        }),
        option: (provided, state) => ({
          ...provided,
          background: state.isSelected
            ? "rgba(67, 151, 178, 0.1)"
            : state.isFocused
            ? "rgba(67, 151, 178, 0.1)"
            : provided.background,
          borderRadius: "20px",
          border: "none",
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: "#43b25b",
          zIndex: 15,
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
