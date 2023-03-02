import React from "react";
import styles from "./SelectCustom.module.css";
import AsyncSelect from "react-select";

interface SelectCustomProps {
  className: string | undefined;
  options: {
    value: string;
    label: JSX.Element;
  }[];
  placeholder: string;
}

const SelectCustom = ({
  className,
  options,
  placeholder,
  ...rest
}: SelectCustomProps) => {
  /*const filterTokens = (inputValue: string) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: TokenOption[]) => void
  ) => {
    setTimeout(() => {
      callback(filterTokens(inputValue));
    }, 1000);
  }; */

  return (
    <div className={className}>
      <AsyncSelect
        {...rest}
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
            fontsize: "18px",
            padding: "0px 26px",
            zIndex: 14,
            width: "215px",
            boxShadow: "none",
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isFocused ? "rgba(22, 40, 51)" : "#43b25b",
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
            maxHeight: "fit-content",
            width: "215px",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#rgba(67, 151, 178, 0.1)"
              : provided.backgroundColor,
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
        className={styles.select_container}
        classNamePrefix={styles.select}
        options={options}
        isSearchable
        //@ts-ignores
        cacheOptions
        defaultOptions
      />
    </div>
  );
};

export default SelectCustom;
