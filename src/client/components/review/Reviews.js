import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';
import {ReviewCard} from "./ReviewCard";
import {AddEditReviewForm} from "./ReviewForm";
import { fetchReviews, addReview, deleteReview, updateReview } from '../../api.js';

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
            .then(data => {
                setReviews(data);
                setIsLoading(false);
                setIsAddingOrEditing(false);
                setIsSaving(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
                setIsAddingOrEditing(false);
                setIsSaving(false);

            });
    }, [mealId,isSaving]);

    const handleAddReview = (review) => {
        addReview(review)
            .then(data => {
                setReviews([...reviews, data]);
                setIsAddingOrEditing(false);
                setIsSaving(true);
            })
    };

    const handleDeleteReview = (id) => {
        deleteReview(id)
            .then(() => setReviews(reviews.filter(review => review.id !== id)))
    };

    const handleUpdateReview = (id, updatedReview) => {
        updateReview(id, updatedReview)
            .then(data => {
                setReviews(reviews.map(review => review.id === id ? data : review));
                setIsAddingOrEditing(false);
                setEditingReview(null);
                setIsSaving(true);
            })
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
        setIsAddingOrEditing(true);
    };

    const handleAddReviewClick = () => {
        setIsAddingOrEditing(true);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <>
            <h2>Reviews</h2>
            {!isAddingOrEditing && <div className={styles.addReview}>
                <button onClick={handleAddReviewClick}>Add a Review</button>
            </div>
            }
            {isAddingOrEditing && (
                <AddEditReviewForm
                    mealId={mealId}
                    onCancel={() => {
                        setIsAddingOrEditing(false);
                        setEditingReview(null);
                    }}
                    onSave={editingReview ? (review) => handleUpdateReview(editingReview.id, review) : handleAddReview}
                    review={editingReview}
                />
            )}
            {!isAddingOrEditing && reviews.map((review, index) => (
                <ReviewCard
                    key={review.id+ index}
                    review={review}
                    onDelete={handleDeleteReview}
                    onEdit={handleEditReview}
                />
            ))}
        </>
    );
};
