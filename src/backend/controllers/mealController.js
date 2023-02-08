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
        if(Object.keys(meal).length === 0) {
            res.status(404).json("No meal found");
        }
        else {
            res.status(200).json(meal);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to retrieve the first meal'});
    }
}

const getLastMeal = async (req, res) => {
    try {
        const meal = await Meal.getLastMeal();
        if(Object.keys(meal).length === 0) {
            res.status(404).json("No meal found");
        }
        else {
            res.status(200).json(meal);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to retrieve the last meal'});
    }
}

module.exports = {
    getAllFutureMeals,
    getAllPastMeals,
    getAllMeals,
    getLastMeal,
    getFirstMeal
};