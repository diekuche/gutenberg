import React from 'react';
import styles from './index.module.css';
import Form from '../Form/Form'
import Header from '../../Header/Header'
import Input from '../Input/Input'


type MainProps = {

}

export const MainPage = (props: MainProps) => {

    return (
        <div className={styles.mainpage}>
            <Header/>
            <Form></Form>
        </div>
    );
    }

export default MainPage;