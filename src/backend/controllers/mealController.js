const Meal = require('../models/meal')

const getAllFutureMeals = async(req, res) => {
    try {
        const meals = await Meal.getAllFutureMeals();
        res.status(200).json(meals);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to retrieve all the future meals'});
    }
}
const getAllPastMeals = async (req, res) => {
    try {
        const meals = await Meal.getAllPastMeals();
        res.status(200).json(meals);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to retrieve all the past meals'});
    }
}

const getAllMeals = async (req, res) =>  {
    try {
        const meals = await Meal.getAllMeals();
        res.status(200).json(meals);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to retrieve all the meals'});
    }
}

const getFirstMeal = async (req, res) => {
    try {

        const meal = await Meal.getFirstMeal();
        meal.length > 0
            ? res.status(200).json(meal)
            : res.status(404).json("No meal found");

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to retrieve the first meal'});
    }
}

const getLastMeal = async (req, res) => {
    try {
        const meal = await Meal.getLastMeal();
        meal.length > 0
            ? res.status(200).json(meal)
            : res.status(404).json("No meal found");
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to retrieve the last meal'});
    }
}

const getMealById = async (req, res) => {
    try {
        const meal = await Meal.getMealById(req.params.id);
        meal.length > 0
            ? res.status(200).json(meal)
            : res.status(404).json("No meal found");

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to retrieve the meal'});
    }
}

const updateMealById = async (req, res) => {
    try {
        const result = await Meal.updateMealById(req.params.id, req.body);
        result ?
            res.status(200).json('Meal updated') :
            res.status(404).json("No meal found");
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to update the meal'});
    }
}

const deleteMealById = async (req, res) => {
    try {
        const result = await Meal.deleteMealById(req.params.id);
        result ?
            res.status(200).json('Meal deleted') :
            res.status(404).json("No meal found");
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to delete the meal'});
    }
}

const createMeal = async (req, res) => {
    try {
        const result = await Meal.createMeal(req.body);

        if (result.length)
            res.status(201).json('Meal created');

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to create the meal'});
    }
}


module.exports = {
    getAllFutureMeals,
    getAllPastMeals,
    getAllMeals,
    getLastMeal,
    getFirstMeal,
    getMealById,
    updateMealById,
    deleteMealById,
    createMeal
};