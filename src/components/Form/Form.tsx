import styles from './index.module.css';
import React, { useState } from 'react';
import Input from '../Input/Input'

type FormProps = {
}

export const Form: React.FC<FormProps> = (props: FormProps) => {

    return (
        <div className={styles.form}>
            <div className={styles.formheader}>Create New Token</div>
            <Input 
                label={`Token's Name:`} 
                subtitle={`You can specify any name you like. But it is better to come up with something original`}
                placeholder={`John's Obligations`}
            />
            <Input 
                label={`Symbol:`} 
                subtitle={`How your token will be displayed in users' wallets`}
                placeholder={`JUSD`}
            />
            <Input 
                label={`Quantity:`} 
                subtitle={`You can print as many tokens as you want`}
                placeholder={`0`}
            />
            <Input 
                label={`Decimals:`} 
                subtitle={`The number of digits after the decimal point (e.x. Bitcoin has 8 digits)`}
                placeholder={`0`}
            />
            <Input 
                label={`Logo URL:`}
                placeholder={`https://www.example.com/image.png`}
            />
        </div>
    );
    }

export default Form;