import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  children: string;
}

export interface StartButtonProps extends ButtonProps {
  color?: "white" | "green" | "black";
  size?: "sm" | "lg";
}

const Button: React.FC<StartButtonProps> = (props: StartButtonProps) => {
  let color = props.color;
  let size = props.size;

  const btnClass = classNames(
    color === "white"
      ? styles.white
      : color === "green"
      ? styles.green
      : styles.black,
    size === "sm" ? styles.sm : styles.lg,
    {}
  );

  return (
    <button color={color} type={props.type} className={btnClass}>
      {props.children}
    </button>
  );
};

export default Button;
