const knex = require("../database");


const getAllFutureMeals = async () => {
    return await knex
        .select()
        .from('meal')
        .where('meal_time', '>', knex.raw('CURRENT_TIMESTAMP'))
        .catch(err => {
            console.error(err);
            throw err;
        });
}


const getAllPastMeals = async () => {
    return await knex
        .select()
        .from('meal')
        .where('meal_time', '<', knex.raw('CURRENT_TIMESTAMP'))
        .catch(err => {
            console.error(err);
            throw err;
        });
}


const getAllMeals = async () => {
    return await knex
        .select()
        .from('meal')
        .orderBy('id')
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const getFirstMeal = async () => {
    return await knex
        .select()
        .from('meal')
        .orderBy('id' , 'asc')
        .first()
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const getLastMeal = async () => {
    return await knex
        .select()
        .from('meal')
        .orderBy('id' , 'desc')
        .first()
        .catch(err => {
            console.error(err);
            throw err;
        });
}

module.exports = {
    getAllFutureMeals,
    getAllPastMeals,
    getAllMeals,
    getFirstMeal,
    getLastMeal
};