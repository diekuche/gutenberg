import React from "react";
import styles from "./SelectCustom.module.css";
import Select from "react-select";

const options = [
  { value: "boot", label: "BOOT" },
  { value: "strawberry", label: "GUT" },
  { value: "pignon", label: "PIGNON" },
];
interface SelectCustomProps {
  className: string | undefined;
}

const SelectCustom = ({ className }: SelectCustomProps) => {
  return (
    <div className={className}>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: "135px",
            border: "0px solid",
            borderRadius: "28px",
            background: "rgba(22, 40, 51, 0.4);",
            color: state.isFocused ? "white" : "#43b25b",
            fontsize: "18px",
          }),
          dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            color: "#43b25b",
          }),
          indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "grey",
            color: "#43b25b",
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "#162833;",
            color: "green",
            borderRadius: "28px",
          }),
        }}
        className="select-container"
        classNamePrefix="select"
        options={options}
      />
    </div>
  );
};

export default SelectCustom;
