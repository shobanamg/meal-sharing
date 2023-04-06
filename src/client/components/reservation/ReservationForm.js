import React, {useEffect, useState} from 'react';
import styles from './Reservations.module.css';
import {addReservation, fetchMealsWithAvailableSpots} from "../../api";
import Loader from "../loader/Loader";
import {findAvailableSpots} from "../../utils/findAvailableSpots";
import SuccessModal from "../modal/SuccessModal";

const initialState = {
    mealId: "",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    numberOfGuests: "",
};

const ReservationForm = ({selectedMeal}) => {
    const [reservation, setReservation] = useState(initialState);
    const [mealsWithAvailableSpots, setMealsWithAvailableSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    useEffect(() => {
        fetchMealsWithAvailableSpots()
            .then(data => {
                setMealsWithAvailableSpots(data);
                setLoading(false);
            })
    }, []);

    const availableSpots = findAvailableSpots(mealsWithAvailableSpots, selectedMeal);


    const handleSubmit = (event) => {
        event.preventDefault();
        const newReservation = {
            meal_id: selectedMeal.id,
            contact_number: reservation.contactNumber,
            contact_name: reservation.contactName,
            contact_email: reservation.contactEmail,
            number_of_guests: reservation.numberOfGuests,

        };
        addReservation(newReservation)
            .then(() => {
                setReservation(initialState);
            })
        setShowSuccessModal(true);
    };

    function handleCloseSuccessModal() {
        setShowSuccessModal(false);
    }

    const handleChange = (event) => {
        setReservation({...reservation, [event.target.name]: event.target.value});
    };


    if (loading) {
        return <Loader/>
    }
console.log(availableSpots);
    return (
        <div>
            <h2>Reservations</h2>
            {!availableSpots ?
                <h3>Sorry, This meal is not available for reservation at the moment.
                    All the spots booked. Please choose another meal</h3>

                : (<div className={styles.reservationCard}>
                    <h3>Available Reservations :<span>{availableSpots}</span></h3>
                    <form onSubmit={handleSubmit} className={styles.reservationForm}>
                        <div className={styles.fieldsContainer}>

                            <div className={styles.fieldContainer}>
                                <label htmlFor="contactName">Name:</label>
                                <input type="text" name="contactName" value={reservation.contactName}
                                       onChange={handleChange}/>
                            </div>
                            <div className={styles.fieldContainer}>
                                <label htmlFor="contactEmail">Email:</label>
                                <input type="email" name="contactEmail" value={reservation.contactEmail}
                                       onChange={handleChange}/>
                            </div>
                            <div className={styles.fieldContainer}>
                                <label htmlFor="contactNumber">Mobile:</label>
                                <input type="tel"
                                       pattern="[0-9]{8}"
                                       name="contactNumber" value={reservation.contactNumber}
                                       onChange={handleChange}/>
                            </div>
                            <div className={styles.fieldContainer}>
                                <label htmlFor="numberOfGuests">Number of Guests:</label>
                                <input type="number" name="numberOfGuests" value={reservation.numberOfGuests}
                                       onChange={handleChange}/>
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit">Make Reservation</button>
                        </div>
                    </form>
                </div>)
            }
            {showSuccessModal && (
                <SuccessModal message="Form submitted successfully!" onClose={handleCloseSuccessModal} />
            )}
        </div>
    );
};

export default ReservationForm;