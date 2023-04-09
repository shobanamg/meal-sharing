const Review = require("../models/review");

const getReviews = async (req, res) => {
  try {
    const mealId = req.query.meal_id;
    const reviews = await Review.getReviews(mealId);
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve all the reviews" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.getReviewById(req.params.id);
    review.length > 0
      ? res.status(200).json(review)
      : res.status(404).json({ error: "No review found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve the review" });
  }
};

const updateReviewById = async (req, res) => {
  try {
    const result = await Review.updateReviewById(req.params.id, req.body);
    console.log(result);
    result
      ? res.status(200).json({ message: "Review updated" })
      : res.status(404).json({ error: "No review found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update the review" });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const result = await Review.deleteReviewById(req.params.id);
    result
      ? res.status(200).json({ message: "Review deleted successfully" })
      : res.status(404).json({ error: "No review found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the review" });
  }
};

const createReview = async (req, res) => {
  try {
    const result = await Review.createReview(req.body);

    if (result.length) res.status(201).json({ message: "Review created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create the review" });
  }
};

module.exports = {
  getReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  createReview,
};
