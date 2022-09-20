import React from 'react';
import styles from './index.module.css';

export interface InputProps {
    id: string;
    label: string;
    htmlFor?: string;
    placeholder: string;
    type?: string;
    subtitle?: string | undefined;
    value?: string;
    name?: string;
    required?: boolean;
    pattern?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const Input = (props:InputProps) => {
    const { type="text", subtitle, required=true} = props;

    return (
            <label htmlFor={props.htmlFor}className={styles.inputComp}>
                <div className={styles.label}>{props.label}</div>
                <input className={styles.input} id={props.id} name={props.name} onChange={props.onChange} pattern={props.pattern} required={required} type={type} placeholder={props.placeholder} value={props.value}/>
                {subtitle && 
                <div className={styles.subtitle}>
                    {subtitle}
                </div>
                }
            </label>
    );
    }

export default Input;