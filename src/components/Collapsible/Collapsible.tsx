import styles from "./index.module.css";
import React, { useState } from "react";
import upYellowArrow from "../../assets/upYellowArrow.svg";
import downyellow from "../../assets/downyellow.svg";

export interface CollapsibleProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
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
        {title}
        {
          <img
            alt="icons"
            className={styles.icon}
            src={open ? downyellow : upYellowArrow}
          />
        }
      </button>
      {open && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export default Collapsible;
