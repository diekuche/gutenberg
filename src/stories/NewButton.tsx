import React from "react";
import classNames from "classnames";
import styles from "./NewButton.module.css";

export interface StartButtonProps
  extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  color?: "white" | "green" | "black";
  size?: "sm" | "lg" | "hg";
}

const NewButton: React.FC<StartButtonProps> = (props: StartButtonProps) => {
  const {
    color, size, className, children, ...rest
  } = props;

  const btnClass = classNames(className, {
    [styles.white]: color === "white",
    [styles.green]: color === "green",
    [styles.black]: color === "black",
    [styles.sm]: size === "sm",
    [styles.lg]: size === "lg",
    [styles.hugeSize]: size === "hg",
  });

  return (
    <button type="button" className={btnClass} {...rest}>
      <div className={styles.button_text}>{children}</div>
    </button>
  );
};
export default NewButton;
