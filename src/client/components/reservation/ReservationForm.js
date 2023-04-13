import React, { useState } from "react";
import styles from "./Reservations.module.css";
import { addReservation } from "../../api";
import SuccessModal from "../modal/SuccessModal";
import Button from "../buttons/Button";

const initialState = {
  mealId: "",
  contactName: "",
  contactEmail: "",
  contactNumber: "",
  numberOfGuests: "",
};

const ReservationForm = ({
  mealId,
  availableSpots,
  setIsSavingReservation,
}) => {
  const [reservation, setReservation] = useState(initialState);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReservation = {
      meal_id: mealId,
      contact_number: reservation.contactNumber,
      contact_name: reservation.contactName,
      contact_email: reservation.contactEmail,
      number_of_guests: reservation.numberOfGuests,
    };
    addReservation(newReservation).then(() => {
      setReservation(initialState);
    });
    setShowSuccessModal(true);
  };

  function handleCloseSuccessModal() {
    setShowSuccessModal(false);
    setIsSavingReservation(true);
  }

  const handleChange = (event) => {
    setReservation({ ...reservation, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h2>Reservations</h2>
      {!availableSpots ? (
        <h3 className={styles.info}>
          Sorry, This meal is not available for reservation at the moment. All
          the spots are booked. Please choose another meal.
        </h3>
      ) : (
        <div className={styles.reservationCard}>
          <h3>
            Available Reservations :<span>{availableSpots}</span>
          </h3>
          <form onSubmit={handleSubmit} className={styles.reservationForm}>
            <div className={styles.fieldsContainer}>
              <div className={styles.fieldContainer}>
                <label htmlFor="contactName">Name:</label>
                <input
                  type="text"
                  name="contactName"
                  value={reservation.contactName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="contactEmail">Email:</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={reservation.contactEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="contactNumber">Mobile:</label>
                <input
                  type="tel"
                  pattern="[0-9]{8}"
                  name="contactNumber"
                  value={reservation.contactNumber}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.fieldContainer}>
                <label htmlFor="numberOfGuests">Number of Guests:</label>
                <input
                  type="number"
                  name="numberOfGuests"
                  min="1"
                  max={availableSpots}
                  value={reservation.numberOfGuests}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button variant="primary" type="submit">
                Make Reservation
              </Button>
            </div>
          </form>
        </div>
      )}
      {showSuccessModal && (
        <SuccessModal
          message="Form submitted successfully!"
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
};

export default ReservationForm;
