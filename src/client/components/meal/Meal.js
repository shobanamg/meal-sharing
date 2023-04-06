import React from 'react';
import styles from './Meal.module.css';
import {Link} from 'react-router-dom';
import images from "../../images";

const Meal = ({ meal }) => {
    return (
        <>
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

