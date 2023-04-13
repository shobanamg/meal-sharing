const express = require("express");
const router = express.Router();
const MealController = require("../controllers/mealController");

router.get("/future-meals", MealController.getAllFutureMeals);
router.get("/past-meals", MealController.getAllPastMeals);
router.get("/all-meals", MealController.getAllMeals);
router.get("/first-meal", MealController.getFirstMeal);
router.get("/last-meal", MealController.getLastMeal);
router.get("/:id", MealController.getMealById);
router.put("/:id", MealController.updateMealById);
router.delete("/:id", MealController.deleteMealById);
router.get("/", MealController.getMeals);
router.post("/", MealController.createMeal);
router.post("/create-meals", MealController.createMeals);
router.get("/:meal_id/reviews", MealController.getReviewsByMealId);
module.exports = router;
