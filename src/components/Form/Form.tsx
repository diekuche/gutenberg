import styles from './index.module.css';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Button from '../Button/Button'
import Collapsible from '../Collapsible/Collapsible'
import Input from '../Input/Input'


type FormProps = {

}

export const Form: React.FC<FormProps> = (props: FormProps) => {

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { token, symbol, quantity, decimals, logo } = event.target as typeof event.target & {
            token: { value: string}
            symbol: { value: string}
            quantity: { value: number}
            decimals: { value: number}
            logo: { value: string}
        }

    console.log(token.value, symbol.value, quantity.value, decimals.value, logo.value)

    await fetch('/route', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            token: token.value,
            symbol: symbol.value,
            quantity: symbol.value,
            decimals: symbol.value,
            logo: symbol.value
        })
    })
    };

    return (
        <div className={styles.form}>
            <div className={styles.formheader}>Create New Token</div>
            <form onSubmit={evt => {handleSubmit(evt)}}>
                <Input
                    id='token'
                    label={`Token's Name:`}
                    htmlFor='token'
                    subtitle={`You can specify any name you like. But it is better to come up with something original`}
                    pattern={`[A-Za-z-0-9\s]{3,50}`}
                    placeholder={`John's Obligations`}
                    name='token'
                    required
                />
                <Input 
                    id='symbol'
                    htmlFor='symbol'
                    label={`Symbol:`} 
                    name='symbol'
                    subtitle={`How your token will be displayed in users' wallets`}
                    pattern={`[A-Za-z-0-9]{2,5}`}
                    placeholder={`JUSD`}
                    required
                />
                <Input 
                    id='quantity'
                    htmlFor='quantity'
                    label={`Quantity:`} 
                    name='quantity'
                    subtitle={`You can print as many tokens as you want`}
                    pattern={`[0-9]{1,}`}
                    placeholder={`0`}
                    required
                />
                <Input 
                    id='decimals'
                    htmlFor='decimals'
                    label={`Decimals:`}
                    name='decimals'
                    subtitle={`The number of digits after the decimal point (e.x. Bitcoin has 8 digits)`}
                    pattern={`[0-9]{0,10}`}
                    placeholder={`0`}
                />
                <Input 
                    id='logo'
                    htmlFor='logo'
                    label={`Logo URL:`}
                    name='logo'
                    pattern={`[A-Za-z-0-9]{3,200}`}
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