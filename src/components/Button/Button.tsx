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
  const { color, size, className, children, ...rest } = props;

  const btnClass = classNames(
    className,
    color === "white"
      ? styles.white
      : color === "green"
      ? styles.green
      : styles.black,
    size === "sm" ? styles.sm : styles.lg,
    {}
  );

  return (
    <button type="button" className={btnClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
