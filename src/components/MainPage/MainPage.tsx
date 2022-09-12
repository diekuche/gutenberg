import React from 'react';
import styles from './index.module.css';
import Header from '../../Header/Header'
import Input from '../Input/Input'


type MainProps = {

}

export const MainPage = (props: MainProps) => {

    return (
        <div className={styles.mainpage}>
            <Header/>
            <Input 
                label={`Token's Name`} 
                subtitle={`You can specify any name you like. But it is better to come up with something original`}
                placeholder={`John's Obligations`}
                type={`text`}
            />
        </div>
    );
    }

export default MainPage;