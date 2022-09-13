import styles from './index.module.css';
import React, { useState } from 'react';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';

export interface CollapsibleProps {
    children: React.ReactNode;
    title: string;
    type: string;
    icon?: JSX.Element;
}

export const Collapsible: React.FC<CollapsibleProps> = (props: CollapsibleProps) => {
    const [open, setOpen] = useState(false);
    const icon = props.icon;

    const collapse = () => {
        setOpen(!open);
      };

    return(
        <div className={styles.wrapper}>
            <button className={styles.title} onClick={collapse}>{(open && <img alt="" className={styles.icon} src={minus}/> || <img alt="" className={styles.icon} src={plus}/>)}{props.title}</button>
            {open && (
                <div className={styles.children}>
                    {props.children}
                </div>
            )}
        </div>
    );
};

export default Collapsible;

