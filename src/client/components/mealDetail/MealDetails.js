import React, {useEffect, useState} from 'react';
import {Reviews} from '../review/Reviews';
import TabMenu from './TabMenu';
import styles from './MealDetails.module.css';
import {useParams} from "react-router-dom";
import {fetchMealById} from "../../api";
import Loader from "../loader/Loader";
import Meal from "../meal/Meal";
import ReservationForm from "../reservation/ReservationForm";
import BackButton from "../buttons/BackButton";

const MealDetails = () => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [reviewsVisible, setReviewsVisible] = useState(true);
    const [reservationsVisible, setReservationsVisible] = useState(false);
    const [meal, setMeal] = useState({});
    const [loading, setLoading] = useState(true);

    const {id} = useParams();
    useEffect(() => {
        fetchMealById(id)
            .then(data => {
                setMeal(data[0]);
                setLoading(false);
            })
    }, []);


    const handleReviewsTabClick = () => {
        setActiveTab('reviews');
        setReviewsVisible(true);
        setReservationsVisible(false);
    };

    const handleReservationsTabClick = () => {
        setActiveTab('reservations');
        setReviewsVisible(false);
        setReservationsVisible(true);
    };

    return (

        <div className={styles.allContainer}>
            <BackButton/>
            {loading ? <Loader/> : <Meal meal={meal}/>}
            <TabMenu onReviewsTabClick={handleReviewsTabClick} onReservationsTabClick={handleReservationsTabClick}/>
            {reviewsVisible && <Reviews mealId={meal.id}/>}
            {reservationsVisible && <ReservationForm selectedMeal={meal}/>}
        </div>

    );
};

export default MealDetails;
