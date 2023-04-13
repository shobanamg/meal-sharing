import React, { useState, useEffect } from "react";
import styles from "./Reviews.module.css";
import { ReviewCard } from "./ReviewCard";
import { AddEditReviewForm } from "./ReviewForm";
import {
  fetchReviews,
  addReview,
  deleteReview,
  updateReview,
} from "../../api.js";
import Button from "../buttons/Button";
import Loader from "../loader/Loader";

export const Reviews = ({ mealId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchReviews(mealId)
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
        setIsSaving(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        setIsSaving(false);
      });
  }, [mealId, isSaving]);

  const handleAddReview = (review) => {
    addReview(review).then(() => {
      setIsAddingOrEditing(false);
      setIsSaving(true);
    });
  };

  const handleDeleteReview = (id) => {
    deleteReview(id).then(() =>
      setReviews(reviews.filter((review) => review.id !== id))
    );
  };

  const handleUpdateReview = (id, updatedReview) => {
    updateReview(id, updatedReview).then(() => {
      setIsAddingOrEditing(false);
      setEditingReview(null);
      setIsSaving(true);
    });
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setIsAddingOrEditing(true);
  };

  const handleAddReviewClick = () => {
    setIsAddingOrEditing(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <h2>Reviews</h2>
      {!isAddingOrEditing && (
        <div className={styles.addReview}>
          <Button variant="primary" onClick={handleAddReviewClick}>
            Add a Review
          </Button>
        </div>
      )}
      {isAddingOrEditing && (
        <AddEditReviewForm
          mealId={mealId}
          onCancel={() => {
            setIsAddingOrEditing(false);
            setEditingReview(null);
          }}
          onSave={
            editingReview
              ? (review) => handleUpdateReview(editingReview.id, review)
              : handleAddReview
          }
          review={editingReview}
        />
      )}
      {!isAddingOrEditing &&
        reviews.map((review, index) => (
          <ReviewCard
            key={review.id + index}
            review={review}
            onDelete={handleDeleteReview}
            onEdit={handleEditReview}
          />
        ))}
    </>
  );
};
