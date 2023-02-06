import React from "react";
import styles from "./newButton.module.css";

const NewButton = (props: any) => {
  const handleClick = () => {
    console.log("took");
  };

  return (
    <div className={styles.common}>
      <button className={styles.hugesize} onClick={handleClick}>
        {props.text}
      </button>
    </div>
  );
};

export default NewButton;
