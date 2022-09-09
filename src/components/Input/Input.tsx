import React from 'react';
import styles from './index.module.css';

class Input extends React.Component {
    render() {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>
                <h2>Token's Name:</h2>
                <input className={styles.input} type='text' placeholder='Jhon’s USD Obligation'/>
                You can specify any name you like. But it is better to come up with something original
            </label>
        </div>
    );
    }
}

export default Input;