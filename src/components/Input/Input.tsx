import React from 'react';
import styles from './index.module.css';

export interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    subtitle: string;
}


export const Input = (props:InputProps) => {

    return (
            <label className={styles.inputComp}>
                <div className={styles.label}>{props.label}</div>
                <input className={styles.input} type={props.type} placeholder={props.placeholder}/>
                <div className={styles.subtitle}>{props.subtitle}</div>
            </label>
    );
    }

export default Input;