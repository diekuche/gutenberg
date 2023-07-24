import React, { useState } from "react";
import plus from "ui/assets/plus.svg";
import minus from "ui/assets/minus.svg";
import styles from "./Collapsible.module.css";

export interface CollapsibleProps
  extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const Collapsible: React.FC<CollapsibleProps> = (
  props: CollapsibleProps,
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
        {title}
        <img alt="icons" className={styles.icon} src={open ? minus : plus} />
      </button>
      {open && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export default Collapsible;
