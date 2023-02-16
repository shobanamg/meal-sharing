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
        .orderBy('id', 'asc')
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
        .orderBy('id', 'desc')
        .first()
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const getMealById = async (id) => {
    return await knex
        .select()
        .from('meal')
        .where({id})
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const updateMealById = async (id, meal) => {
    return await knex('meal')
        .where({id})
        .update(meal)
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const deleteMealById = async (id) => {
    return await knex('meal')
        .where({id})
        .del()
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const createMeal = async (meal) => {
    return await knex('meal')
        .insert(meal)
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const getReviewsByMealId = async (mealId) => {
    return await knex
        .select()
        .from('review')
        .where({meal_id: mealId})
        .catch(err => {
            console.error(err);
            throw err;
        });
}


const getMeals = async (searchParams) => {


    const maxPrice = Number(searchParams.maxPrice);
    const title = searchParams.title;
    const dateAfter = searchParams.dateAfter;
    const dateBefore = searchParams.dateBefore;
    const limit = Number(searchParams.limit);
    const sortKey = searchParams.sortKey;
    const sortDir = searchParams.sortDir;
    const availableReservations = searchParams.availableReservations;

    const query = knex('meal');

    if (availableReservations) {
        query.select('meal.id', 'meal.title', 'meal.description', 'meal.location',
            'meal.meal_time', 'meal.max_reservations', 'meal.price' ).sum('reservation.number_of_guests as reserved_so_far')
            .join('reservation', 'reservation.meal_id', '=', 'meal.id')
            .groupBy('meal.id', 'meal.max_reservations' )
            .having('reserved_so_far', '<', 'meal.max_reservations');
       console.log(query.toSQL().toNative());
    }

    if (typeof availableReservations !== 'undefined' && !availableReservations) {
        query.select('meal.id', 'meal.title', 'meal.description', 'meal.location',
            'meal.meal_time', 'meal.max_reservations', 'meal.price' ).sum('reservation.number_of_guests as reserved_so_far')
            .join('reservation', 'reservation.meal_id', '=', 'meal.id')
            .groupBy('meal.id','meal.max_reservations')
            .having('reserved_so_far', '>', 'meal.max_reservations');
    }


    if (maxPrice && !isNaN(maxPrice)) {
        query.where('price', '<', maxPrice);
    }
    if (title) {
        query.where('title', 'like', `%${title}%`);
    }

    if (dateAfter) {
        query.where('meal_time', '>', dateAfter);
    }

    if (dateBefore) {
        query.where('meal_time', '<', dateBefore);
    }

    if (limit) {
        query.limit(limit);
    }

    if (sortKey === 'meal_time' || sortKey === 'max_reservations' || sortKey === 'price') {
        if (sortDir === 'asc' || sortDir === 'desc') {
            query.orderBy(sortKey, sortDir);
        }
    }

    console.log(query.toSQL().toNative());
    return await query
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
    getLastMeal,
    getMealById,
    updateMealById,
    deleteMealById,
    createMeal,
    getMeals,
    getReviewsByMealId
};