const knex = require("../database");

const getAllFutureMeals = async () => {
  return await knex
    .select()
    .from("meal")
    .where("meal_time", ">", knex.raw("CURRENT_TIMESTAMP"))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getAllPastMeals = async () => {
  return await knex
    .select()
    .from("meal")
    .where("meal_time", "<", knex.raw("CURRENT_TIMESTAMP"))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getAllMeals = async () => {
  return await knex
    .select()
    .from("meal")
    .orderBy("id")
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getFirstMeal = async () => {
  return await knex
    .select()
    .from("meal")
    .orderBy("id", "asc")
    .first()
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getLastMeal = async () => {
  return await knex
    .select()
    .from("meal")
    .orderBy("id", "desc")
    .first()
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getMealById = async (id) => {
  const query = knex("meal")
    .select(
      "meal.id",
      "meal.title",
      "meal.description",
      "meal.location",
      "meal.meal_time",
      "meal.max_reservations",
      "meal.price",
      knex.raw("AVG(review.stars) as avg_review_stars"),
      knex.raw("COUNT(review.id) as total_reviews"),
      knex.raw("SUM(reservation.number_of_guests) as reserved_so_far")
    )
    .leftJoin("reservation", "reservation.meal_id", "=", "meal.id")
    .leftJoin("review", "review.meal_id", "=", "meal.id")
    .groupBy("meal.id");

  const meal = await query.where({ "meal.id": id }).catch((err) => {
    console.error(err);
    throw err;
  });

  meal.available_spots = meal.max_reservations - meal.reserved_so_far;

  return meal;
};

const updateMealById = async (id, meal) => {
  return await knex("meal")
    .where({ id })
    .update(meal)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const deleteMealById = async (id) => {
  return await knex("meal")
    .where({ id })
    .del()
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const createMeal = async (meal) => {
  return await knex("meal")
    .insert(meal)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const createMeals = async (meals) => {
  try {
    return await Promise.all(
      meals.map((meal) => {
        return knex("meal").insert(meal);
      })
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getReviewsByMealId = async (mealId) => {
  return await knex
    .select()
    .from("review")
    .where({ meal_id: mealId })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getMeals = async (searchParams) => {
  const {
    maxPrice,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
    sortDir,
    availableReservations,
  } = searchParams;

  const query = knex("meal")
    .select(
      "meal.id",
      "meal.title",
      "meal.description",
      "meal.location",
      "meal.meal_time",
      "meal.max_reservations",
      "meal.price",
      knex.raw("AVG(review.stars) as avg_review_stars"),
      knex.raw("COUNT(review.id) as total_reviews"),
      knex.raw("SUM(reservation.number_of_guests) as reserved_so_far")
    )
    .leftJoin("reservation", "reservation.meal_id", "=", "meal.id")
    .leftJoin("review", "review.meal_id", "=", "meal.id")
    .groupBy("meal.id")
    .orderBy(sortKey || "meal_time", sortDir || "asc");

  if (!availableReservations) {
    query.havingRaw(
      "SUM(reservation.number_of_guests) <= meal.max_reservations OR SUM(reservation.number_of_guests) IS NULL"
    );
  }

  if (maxPrice && !isNaN(maxPrice)) {
    query.where("meal.price", "<", maxPrice);
  }

  if (title) {
    query.where("meal.title", "like", `%${title}%`);
  }

  if (dateAfter) {
    query.where("meal.meal_time", ">", dateAfter);
  }

  if (dateBefore) {
    query.where("meal.meal_time", "<", dateBefore);
  }

  if (limit) {
    query.limit(limit);
  }

  const meals = await query;

  // For each meal, calculate the number of available spots
  for (const meal of meals) {
    meal.available_spots = meal.max_reservations - meal.reserved_so_far;
  }

  return meals;
};

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
  createMeals,
  getMeals,
  getReviewsByMealId,
};
