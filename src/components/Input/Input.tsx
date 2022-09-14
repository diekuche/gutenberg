import { render } from '@testing-library/react';
import React from 'react';
import styles from './index.module.css';

export interface InputProps {
    label: string;
    placeholder: string;
    type?:string;
    subtitle?: string | undefined;
}


export const Input = (props:InputProps) => {
    const subtitle = props.subtitle;
    return (
            <label className={styles.inputComp}>
                <div className={styles.label}>{props.label}</div>
                <input className={styles.input} type={"text"} placeholder={props.placeholder}/>
                {subtitle && 
                <div className={styles.subtitle}>
                    {subtitle}
                </div>
                }
            </label>
    );
    }

export default Input;