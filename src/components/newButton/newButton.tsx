import React from "react";
import styles from "./newButton.module.css";
import classNames from "classnames";

/*const NewButton = (props: any) => {
  const handleClick = () => {
    console.log("took");
  };

  return (
    <div className={styles.common}>
      <button className={styles.hugesize} onClick={handleClick}>
        {props.text}, {props.color}, {props.text}
      </button>
    </div>
  );
};*/

export interface StartButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "white" | "green" | "black" | "red";
  size?: "sm" | "lg";
}

const NewButton: React.FC<StartButtonProps> = (props: StartButtonProps) => {
  const { color, size, className, children, ...rest } = props;

  const handleClick = () => {
    console.log("took");
  };
  console.log(props);
  const btnClass = classNames(className, {
    [styles.white]: color === "white",
    [styles.green]: color === "green",
    [styles.black]: color === "black",
    [styles.sm]: size === "sm",
    [styles.lg]: size === "lg",
    [styles.hugesize]: color === "red",
  });

  return (
    <button type="button" className={btnClass} {...rest} onClick={handleClick}>
      {children}
    </button>
  );
};
export default NewButton;
