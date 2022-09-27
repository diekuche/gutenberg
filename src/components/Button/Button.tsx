import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined
    onClick?: () => void;
}

const Button = (props:ButtonProps) => {

    return (
        
            <button className={styles.button} type={props.type}>
            mint!
            </button>
        
    )
}

export default Button;