import React from "react";

/**
 * Primary UI component for user interaction
 */
import classNames from "classnames";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  color?: "white" | "green" | "yellow" | "yellowTransp" | "sendButton";
  size?: "sm" | "lg";
}

const Button = (props: ButtonProps) => {
  const {
    color, size, className, children, ...rest
  } = props;

  const btnClass = classNames(className, {
    [styles.white]: color === "white",
    [styles.green]: color === "green",
    [styles.yellow]: color === "yellow",
    [styles.sendButton]: color === "sendButton",
    [styles.yellowTransp]: color === "yellowTransp",
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
