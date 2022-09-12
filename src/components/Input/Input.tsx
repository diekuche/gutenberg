import React from 'react';
import styles from './index.module.css';


export const Input = () => {

    return (
            <label className={styles.label}>
                <div className='h2'>Token's Name:</div>
                <input className={styles.input} type='text' placeholder='Jhon’s USD Obligation'/>
                <div className={styles.subtitle}>You can specify any name you like. But it is better to come up with something original</div>
            </label>
    );
    }

export default Input;