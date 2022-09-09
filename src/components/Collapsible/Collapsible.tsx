import styles from './index.module.css';
import React, { useState } from 'react';
import Input from "../Input/Input"

export interface CollapsibleProps {
    title: string;
    children?: string;
}

export const Collapsible = (props: CollapsibleProps) => {
    const {title, children} = props
    const [open, setOpen] = useState(false);

    const collapse = () => {
        setOpen(!open);
      };

    return(
        <div className={styles.wrapper}>
            <button className={styles.title} onClick={collapse}>{title}</button>
            {open && (
                <div className={styles.children}>

                    <Input />
                </div>
            )}
        </div>
    );
};

export default Collapsible;

