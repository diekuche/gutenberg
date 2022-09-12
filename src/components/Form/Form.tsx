import styles from './index.module.css';
import React, { useState } from 'react';
import Input from '../Input/Input'

type FormProps = {
}

export const Form: React.FC<FormProps> = (props: FormProps) => {

    return (
        <div className={styles.form}>
            <h1>Create New Token</h1>
            <Input 
                label={`Token's Name:`} 
                subtitle={`You can specify any name you like. But it is better to come up with something original`}
                placeholder={`John's Obligations`}
                type={`text`}
            />
            <Input 
                label={`Symbol:`} 
                subtitle={`You can print as many tokens as you want`}
                placeholder={`JUSD`}
                type={`text`}
            />
            <Input 
                label={`Quantity:`} 
                subtitle={`You can print as many tokens as you want`}
                placeholder={`0`}
                type={`text`}
            />
            <Input 
                label={`Decimals:`} 
                subtitle={`The number of digits after the decimal point (e.x. Bitcoin has 8 digits)`}
                placeholder={`0`}
                type={`text`}
            />
            <Input 
                label={`Logo URL:`} 
                subtitle={``}
                placeholder={`https://www.example.com/image.png`}
                type={`text`}
            />
        </div>
    );
    }

export default Form;