import React from 'react';
import styles from './Meal.module.css';
import {Link} from 'react-router-dom';
import images from "../../images";

const Meal = ({ meal }) => {
    return (
        <div key={meal.id}>
            <Link to={`/meals/${meal.id}`}>
                <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <img
                            className={styles.image}
                            src={images.find((image) => image.id === meal.id).img}
                            alt="meal picture"
                        />
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.contentContainer}>
                            <div className={styles.titleContainer}>
                                <div>
                                    <h2>{meal.title}</h2>
                                    {<div className={styles.stars}>
                                        {Array.from({length: meal.avg_review_stars}, (_, i) => (
                                            <span key={`${meal.id}-${i}`} className={styles.star}>★</span>
                                        ))}({meal.total_reviews} reviews)
                                    </div>}
                                </div>
                                <p className={styles.bold}>{meal.price} EUR</p>
                            </div>
                            <p className={styles.description}>{meal.description}</p>
                            <div className={styles.locationContainer}>
                                <p className={styles.bold}>Location: {meal.location}</p>
                                <p className={styles.bold}>Available spots: {meal.available_spots}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Meal;

