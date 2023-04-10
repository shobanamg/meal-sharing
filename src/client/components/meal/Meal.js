import React from "react";
import styles from "./Meal.module.css";
import { Link } from "react-router-dom";
import images from "../../images";
import { mealTime } from "../../utils/mealTime";

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
                  {
                    <div className={styles.stars}>
                      {Array.from({ length: meal.avg_review_stars }, (_, i) => (
                        <span key={`${meal.id}-${i}`} className={styles.star}>
                          ★
                        </span>
                      ))}
                      ({meal.total_reviews} reviews)
                    </div>
                  }
                </div>
                <p className={styles.bold}>{meal.price} EUR</p>
              </div>
              <p className={styles.description}>{meal.description}</p>
              <div className={styles.locationContainer}>
                <div className={styles.bold}>
                  <p>Location</p>
                  <span>{meal.location}</span>
                </div>
                <div className={styles.bold}>
                  <p>Meal Time</p>
                  <span>{mealTime(meal.meal_time)}</span>
                </div>
                <div className={styles.bold}>
                  <p>Available Spots</p>
                  <span>{meal.available_spots}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Meal;
