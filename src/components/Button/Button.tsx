import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

export interface StartButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "white" | "green" | "black";
  size?: "sm" | "lg";
}

const Button: React.FC<StartButtonProps> = (props: StartButtonProps) => {
  let color = props.color;
  let size = props.size;
  const { onClick, type, ...rest } = props;

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
    <button type={type} onClick={onClick} className={btnClass} {...rest}>
      {props.children}
    </button>
  );
};

export default Button;
