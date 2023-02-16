const express = require('express')
const router = express.Router();
const ReservationController = require('../controllers/reservationController')

router.get('/:id', ReservationController.getReservationById);
router.put('/:id', ReservationController.updateReservationById);
router.delete('/:id', ReservationController.deleteReservationById);
router.get('/', ReservationController.getAllReservations);
router.post('/', ReservationController.createReservation);

module.exports = router;
