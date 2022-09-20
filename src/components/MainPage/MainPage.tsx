import React from 'react';
import styles from './index.module.css';
import Form from '../Form/Form'
import Header from '../../Header/Header'
import Tabs from '../Tabs/Tabs ';

type MainProps = {

}

export const MainPage = (props: MainProps) => {

    return (
        <div className={styles.mainpage}>
            <Header/>
            <Tabs />
            <Form></Form>
        </div>
    );
    }

export default MainPage;