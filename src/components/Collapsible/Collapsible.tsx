import styles from "./index.module.css";
import React, { useState } from "react";
import plus from "../../assets/plus.svg";
import minus from "../../assets/minus.svg";

export interface CollapsibleProps {
  title: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

export const Collapsible: React.FC<CollapsibleProps> = (
  props: CollapsibleProps
) => {
  const [open, setOpen] = useState(false);
  const { children, title, ...rest } = props;

  const collapse = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.title}
        onClick={collapse}
        {...rest}
      >
        {<img alt="icons" className={styles.icon} src={open ? minus : plus} />}
        {title}
      </button>
      {open && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export default Collapsible;
