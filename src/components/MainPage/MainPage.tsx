import React, {useState} from 'react';
import styles from './index.module.css';
import Header from '../../Header/Header'
import { Tabs } from '../Tabs/Tabs';
import { Tab } from '../Tabs/Tabs';
import { Form } from '../Form/Form';

type MainProps = {

    const handleTabClick = (id: string | number) => {
        setSelectedTabId(id);
    };

    return (
        <div className={styles.mainpage}>
            <Header/>
            <Tabs selectedId={selectedTabId} tabs={tabs} onClick={handleTabClick} />
            <div className={styles.tabPageContent}>
                {selectedTabId === tabs[0].id && (
                    <Form></Form>
                )}
                {selectedTabId === tabs[1].id && (
                    <Form></Form>
                )}
            </div>
        </div>
    );
    }

export default MainPage;