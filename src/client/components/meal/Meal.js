import React from 'react';
import styles from './Meal.module.css';

const Meal = ({ meal }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{meal.title}</h2>
            <p className={styles.description}>{meal.description}</p>
            <p className={styles.price}>{meal.price}</p>
        </div>
    );
};
export default Meal;
