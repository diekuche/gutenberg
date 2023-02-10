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

  const btnClass = classNames(className, {
    [styles.white]: color === "white",
    [styles.green]: color === "green",
    [styles.black]: color === "black",
    [styles.sm]: size === "sm",
    [styles.lg]: size === "lg",
  });

  return (
    <button type="button" className={btnClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
