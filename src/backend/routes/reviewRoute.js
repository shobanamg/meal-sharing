const express = require('express')
const router = express.Router();
const ReviewController = require('../controllers/reviewController')

router.get('/:id', ReviewController.getReviewById);
router.put('/:id', ReviewController.updateReviewById);
router.delete('/:id', ReviewController.deleteReviewById);
router.get('/', ReviewController.getReviews);
router.post('/', ReviewController.createReview);

module.exports = router;
