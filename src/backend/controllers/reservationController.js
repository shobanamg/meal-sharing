const Reservation = require("../models/reservation");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.getAllReservations();
    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve all the reservations" });
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.getReservationById(req.params.id);
    reservation.length > 0
      ? res.status(200).json(reservation)
      : res.status(404).json({ error: "No reservation found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve the reservation" });
  }
};

const updateReservationById = async (req, res) => {
  try {
    const result = await Reservation.updateReservationById(
      req.params.id,
      req.body
    );
    console.log(result);
    result
      ? res.status(200).json({ message: "Reservation updated" })
      : res.status(404).json({ error: "No reservation found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update the reservation" });
  }
};

const deleteReservationById = async (req, res) => {
  try {
    const result = await Reservation.deleteReservationById(req.params.id);
    result
      ? res.status(200).json({ message: "Reservation deleted successfully" })
      : res.status(404).json({ error: "No reservation found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete the reservation" });
  }
};

const createReservation = async (req, res) => {
  try {
    const result = await Reservation.createReservation(req.body);

    if (result.length) res.status(201).json({ message: "Reservation created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create the reservation" });
  }
};

module.exports = {
  getAllReservations,
  getReservationById,
  updateReservationById,
  deleteReservationById,
  createReservation,
};
