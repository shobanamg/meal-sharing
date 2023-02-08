const express = require('express')
const router = express.Router();
const MealController = require('../controllers/mealController')

router.get('/future-meals', MealController.getAllFutureMeals);
router.get('/past-meals', MealController.getAllPastMeals);
router.get('/all-meals', MealController.getAllMeals);
router.get('/first-meal', MealController.getFirstMeal);
router.get('/last-meal', MealController.getLastMeal);

module.exports = router;
