import React, { useState } from "react";
import styles from "./Reviews.module.css";

export const AddEditReviewForm = ({ mealId, review, onSave, onCancel }) => {
  const [title, setTitle] = useState(review ? review.title : "");
  const [stars, setStars] = useState(review ? review.stars : 1);
  const [description, setDescription] = useState(
    review ? review.description : ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ meal_id: mealId, title, stars, description });
    setTitle("");
    setStars(1);
    setDescription("");
  };

  return (
    <div className={styles.addEditReviewCard}>
      <form onSubmit={handleSubmit} className={styles.addEditReviewForm}>
        <h3>{review ? "Edit" : "Add"} Review</h3>
        <div className={styles.fieldsContainer}>
          <div className={styles.fieldContainer}>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="stars">Stars:</label>
            <input
              id="stars"
              type="number"
              min="1"
              max="5"
              value={stars}
              onChange={(event) => setStars(parseInt(event.target.value))}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">{review ? "Save" : "Add Review"}</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
