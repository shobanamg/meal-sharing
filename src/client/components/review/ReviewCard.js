import React from "react";
import styles from "./Reviews.module.css";
import { daysAgo } from "../../utils/daysAgo";
import Button from "../buttons/Button";

export const ReviewCard = ({ review, onDelete, onEdit }) => {
  const handleDeleteClick = (event) => {
    event.preventDefault();
    onDelete(review.id);
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    onEdit(review);
  };

  return (
    <div key={review.id} className={styles.review}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{review.title}</div>
        <div className={styles.date}>
          {daysAgo(review.created_date)} days ago
        </div>
      </div>
      <div className={styles.stars}>
        {Array.from({ length: review.stars }, (_, i) => (
          <span key={i} className={styles.star}>
            ★
          </span>
        ))}
      </div>
      <div className={styles.description}>{review.description}</div>
      <div className={styles.actions}>
        <Button variant="primary" onClick={handleEditClick}>
          Edit
        </Button>
        <Button variant="secondary" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
    </div>
  );
};
