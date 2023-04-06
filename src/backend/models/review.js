const knex = require("../database");

const getReviews = async (meal_id) => {
    let query = knex.select().from('review').orderBy('id');
    if (meal_id) {
        query = query.where('meal_id', meal_id);
    }
    return await query.catch(err => {
        console.error(err);
        throw err;
    });
}

const getReviewById = async (id) => {
    return await knex
        .select()
        .from('review')
        .where({id})
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const updateReviewById = async (id, review) => {
    return await knex('review')
        .where({id})
        .update(review)
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const deleteReviewById = async (id) => {
    return await knex('review')
        .where({id})
        .del()
        .catch(err => {
            console.error(err);
            throw err;
        });
}
const createReview = async (review) => {
    return await knex('review')
        .insert(review)
        .catch(err => {
            console.error(err);
            throw err;
        });
}


module.exports = {
    getReviews,
    getReviewById,
    updateReviewById,
    deleteReviewById,
    createReview
}