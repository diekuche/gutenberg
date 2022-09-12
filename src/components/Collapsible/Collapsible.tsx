import styles from './index.module.css';
import React, { useState } from 'react';

export interface CollapsibleProps {
    children?: React.ReactNode;
    title: string;
    type: string;
}

export const Collapsible: React.FC<CollapsibleProps> = (props: CollapsibleProps) => {
    const [open, setOpen] = useState(false);

    const collapse = () => {
        setOpen(!open);
      };

    return(
        <div className={styles.wrapper}>
            <button className={styles.title} onClick={collapse}>{props.title}</button>
            {open && (
                <div className={styles.children}>
                    {props.children}
                </div>
            )}
        </div>
    );
};

export default Collapsible;

