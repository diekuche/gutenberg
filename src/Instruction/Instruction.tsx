import React from "react";
import styles from "./instruction.module.css";

const instruction = () => {
    return (
        <div className={styles.instruction}>
            <h2>This ultra-modern technology allows to create, mint and manage any possible number of fungible tokens.
            In case of any difficulties, read the <a className ={styles.a}>insruction</a></h2>
        </div>
    );
};