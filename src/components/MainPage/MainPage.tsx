import React from 'react';
import styles from './index.module.css';
import Form from '../Form/Form'
import Header from '../../Header/Header'
import Button from '../Button/Button';
import ButtonSend from '../ButtonSend/ButtonSend';
import ButtonAddToken from '../ButtonAddToken/ButtonAddToken';
import Tabs from '../Tabs/Tabs ';

type MainProps = {

}

export const MainPage = (props: MainProps) => {

    return (
        <div className={styles.mainpage}>
            <Header/>
            <Tabs />
            <Form></Form>
            <Button />
            <ButtonSend />
            <ButtonAddToken />
        </div>
    );
    }

export default MainPage;