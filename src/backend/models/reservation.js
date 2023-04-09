const knex = require("../database");

const getAllReservations = async () => {
  return await knex
    .select()
    .from("reservation")
    .orderBy("id")
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getReservationById = async (id) => {
  return await knex
    .select()
    .from("reservation")
    .where({ id })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const updateReservationById = async (id, reservation) => {
  return await knex("reservation")
    .where({ id })
    .update(reservation)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const deleteReservationById = async (id) => {
  return await knex("reservation")
    .where({ id })
    .del()
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
const createReservation = async (reservation) => {
  return await knex("reservation")
    .insert(reservation)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  getAllReservations,
  getReservationById,
  updateReservationById,
  deleteReservationById,
  createReservation,
};
