import styles from './index.module.css';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Button from '../Button/Button'
import Collapsible from '../Collapsible/Collapsible'
import Input from '../Input/Input'

type FormProps = {
}

interface InputState {
    inputValue: string;
}

export const Form: React.FC<FormProps> = (props: FormProps) => {
    const [inputValue, setinputValue] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { name, symbol } = event.target as typeof event.target & {
            name: { value: string}
            symbol: { value: string}
        }

    await fetch('/route', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            symbol: symbol.value
        })
    })
    };

    return (
        <div className={styles.form}>
            <div className={styles.formheader}>Create New Token</div>
            <form onSubmit={evt => {handleSubmit(evt)}}>
                <Input
                    id='name'
                    label={`Token's Name:`}
                    htmlFor='name'
                    subtitle={`You can specify any name you like. But it is better to come up with something original`}
                    pattern={`[A-Za-z-0-9]{3,50}`}
                    placeholder={`John's Obligations`}
                    name='token'
                    required
                />
                <Input 
                    id='symbol'
                    label={`Symbol:`} 
                    name='symbol'
                    subtitle={`How your token will be displayed in users' wallets`}
                    pattern={`[A-Za-z-0-9]{2,5}`}
                    placeholder={`JUSD`}
                    required
                />
                <Input 
                    id='3'
                    label={`Quantity:`} 
                    subtitle={`You can print as many tokens as you want`}
                    pattern={`[0-9]{1,}`}
                    placeholder={`0`}
                    required
                />
                <Input 
                    id='4'
                    label={`Decimals:`} 
                    subtitle={`The number of digits after the decimal point (e.x. Bitcoin has 8 digits)`}
                    pattern={`[0-9]{0,10}`}
                    placeholder={`0`}
                />
                <Input 
                    id='5'
                    label={`Logo URL:`}
                    pattern={`[A-Za-z-0-9]{3,99}`}
                    placeholder={`https://www.example.com/image.png`}
                />
                <Collapsible type='text' title='Changing Initial Balance' children='changed'/>
                <Collapsible type='text' title='Token Details' children='changed'/>
                <Button type='submit'/>
            </form>
        </div>
    );
    }

export default Form;