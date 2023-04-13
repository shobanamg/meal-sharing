import React, { useEffect, useState } from "react";
import TabMenu from "./TabMenu";
import styles from "./MealDetails.module.css";
import { useParams } from "react-router-dom";
import { fetchMealById } from "../../api";
import Loader from "../loader/Loader";
import Meal from "../meal/Meal";
import BackButton from "../buttons/BackButton";

const MealDetails = () => {
  const [meal, setMeal] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSavingReservation, setIsSavingReservation] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetchMealById(id).then((data) => {
      setMeal(data[0]);
      setLoading(false);
      setIsSavingReservation(false);
    });
  }, [isSavingReservation]);

  return (
    <div className={styles.allContainer}>
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meal meal={meal} />
          <TabMenu
            mealId={meal.id}
            availableSpots={meal.available_spots}
            setIsSavingReservation={setIsSavingReservation}
          />
        </>
      )}
    </div>
  );
};

export default MealDetails;
