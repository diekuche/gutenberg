import React from 'react';
import styles from './index.module.css';
import Collapsible from '../Collapsible/Collapsible'
import Header from '../../Header/Header'


type MainProps = {

}

export const MainPage = (props: MainProps) => {

    return (
        <div className={styles.mainpage}>
            <Header/>
            <Collapsible type='text' title='Changing Initial Balance' children='changed'/>
        </div>
    );
    }

export default MainPage;