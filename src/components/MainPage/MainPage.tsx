import React from 'react';
import styles from './index.module.css';
import Header from '../../Header/Header'
import Input from '../Input/Input'

export const MainPage = () => {

    return (
        <div className={styles.mainpage}>
            <Header/>
            <Input/>
        </div>
    );
    }

export default MainPage;