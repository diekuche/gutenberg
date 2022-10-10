import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
<<<<<<< HEAD
    type: "button" | "submit" | "reset" | undefined
    onClick?: () => void;
=======
  type: "button" | "submit" | "reset" | undefined;
>>>>>>> c76f082961879f91515fad348aaaffffe8418248
}

const Button = (props: ButtonProps) => {
  return (
    <button className={styles.button} type={props.type}>
      mint!
    </button>
  );
};

export default Button;
