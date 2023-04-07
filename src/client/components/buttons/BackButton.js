import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './BackButton.module.css';

const BackButton = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <button className={styles.backButton} onClick={goBack}>
            <span className={styles.backIcon}>&#8592;</span> Back
        </button>
    );
};

export default BackButton;
