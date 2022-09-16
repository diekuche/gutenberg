import React from 'react';
import styles from './index.module.css';

export interface InputProps {
    label: string;
    placeholder: string;
    type?: string;
    subtitle?: string | undefined;
}


export const Input = (props:InputProps) => {
    const {type="text", subtitle} = props;

    return (
            <label className={styles.inputComp}>
                <div className={styles.label}>{props.label}</div>
                <input className={styles.input} type={type} placeholder={props.placeholder}/>
                {subtitle && 
                <div className={styles.subtitle}>
                    {subtitle}
                </div>
                }
            </label>
    );
    }

export default Input;