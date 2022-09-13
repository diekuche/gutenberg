import { render } from '@testing-library/react';
import React from 'react';
import styles from './index.module.css';

export interface InputProps {
    label: string;
    placeholder: string;
    type?:string & typeof defaultProps;
    subtitle?: string | undefined;
}

const defaultProps = {
    type: `text`,

 };

export const Input = (props:InputProps) => {
    const subtitle = props.subtitle;

    return (
            <label className={styles.inputComp}>
                <div className={styles.label}>{props.label}</div>
                <input className={styles.input} type={props.type} placeholder={props.placeholder}/>
                <div className={styles.subtitle}>{(subtitle && <div>{subtitle}</div>) || ""}</div>
            </label>
    );
    }

export default Input;