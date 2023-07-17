import AsyncSelect, { Props } from "react-select";
import classNames from "classnames";
import styles from "./SelectCustom.module.css";

export interface SelectCustomProps<VALUE=string, LABEL=unknown> extends Props<{
  label: LABEL;
  value: VALUE;
}, false> {
  heightControl?: number;
  fontSizePlaceholder?: number;
  minHeight?: number;
  minWidthMenu?: number;
  paddingMenu?: number;
  topMenu?: number;
  rightMenu?: number;
}

const SelectCustom = <VALUE=string, LABEL=unknown>(props: SelectCustomProps<VALUE, LABEL>) => {
  const {
    options,
    placeholder,
    className,
    heightControl = 44,
    fontSizePlaceholder = 20,
    minWidthMenu = 474,
    paddingMenu = 30,
    topMenu = -50,
    rightMenu = -35,
    ...rest
  } = props;
  return (
    <AsyncSelect
      placeholder={placeholder}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "none",
          minHeight: "20px",
          height: `${heightControl}px`,
          borderColor: state.isFocused ? "green" : "transparent",
          borderRadius: "8px",
          background: "transparent",
          zIndex: 14,
          width: "100%",
          boxShadow: "none",
        }),
        placeholder: () => ({
          fontSize: `${fontSizePlaceholder}px`,
          color: "#F6F8FE",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "#E2FB5F",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "transparent",
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          position: "absolute",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          position: "absolute",
          zIndex: 16,
          top: `${topMenu}px`,
          right: `${rightMenu}px`,
          borderRadius: "12px",
          backgroundColor: "rgba(6, 15, 25)",
          maxHeight: "380px",
          minWidth: `${minWidthMenu}px`,
          transition: "opacity 2s",
          overflow: "hidden",
          boxShadow: "none",
          padding: `${paddingMenu}px`,
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          maxHeight: "320px",
          overflowX: "hidden",
          overflowY: "auto",
          "::-webkit-scrollbar": {
            background: "transparent",
            width: "4px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "rgba(115, 237, 201, 0.1)",
            borderRadius: "10px",
          },
          border: "none",
          padding: "5px",
        }),
        option: (provided, state) => ({
          ...provided,
          // eslint-disable-next-line no-nested-ternary
          background: state.isSelected
            ? "rgba(67, 151, 178, 0.1)"
            : state.isFocused
              ? "rgba(67, 151, 178, 0.1)"
              : provided.background,
          borderRadius: "8px",
          border: "none",
          marginBottom: "4px",
          padding: "12px",
        }),
        singleValue: (provided) => ({
          ...provided,
          color: "#F6F8FE",
          margin: "0px",
          padding: "0px",
          zIndex: 15,
        }),
        valueContainer: (provided) => ({
          ...provided,
          display: "flex",
          padding: "0px",
          margin: "0px",
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
