import React from 'react';
import styles from './Meal.module.css';
import {Link} from 'react-router-dom';

const Meal = ({ meal }) => {
    return (
        <>
            <Link to={`/meals/${meal.id}`}>
                <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <img
                            className={styles.image}
                            src={
                                'https://images.unsplash.com/photo-1644677867331-03f28942e35c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80'
                            }
                            alt="meal picture"
                        />
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.contentContainer}>
                            <div>
                                <h2>{meal.title}</h2>
                                <p>{meal.description}</p>
                            </div>
                            <div className={styles.locationContainer}>
                                <p>Location: {meal.location}</p>
                            </div>
                        </div>
                        <div className={styles.priceContainer}>
                            <p className={styles.price}>{meal.price} Kr.</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Meal;

