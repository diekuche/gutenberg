import React from 'react';
import styles from './index.module.css';

export interface InputProps {
    label: string;
    placeholder: string;
    type?: string;
    subtitle?: string | undefined;
    value?: string;
    name?: string;
    required?: boolean;
}


export const Input = (props:InputProps) => {
    const { type="text", subtitle, required=true } = props;

    return (
            <label className={styles.inputComp}>
                <div className={styles.label}>{props.label}</div>
                <input className={styles.input} name={props.name} required={required} type={type} placeholder={props.placeholder} value={props.value}/>
                {subtitle && 
                <div className={styles.subtitle}>
                    {subtitle}
                </div>
                }
            </label>
    );
    }

export default Input;