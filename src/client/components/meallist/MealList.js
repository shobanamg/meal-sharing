import React from "react";
import Meal from "../meal/Meal";
import styles from "./MealList.module.css";
import Loader from "../loader/Loader";
import { useMealContext } from "../context/mealContext";
import SeeMoreButton from "../buttons/SeeMore";
import BackButton from "../buttons/BackButton";
import Search from "../search/Search";
import MealSort from "../mealSort/MealSort";

const MealList = ({ isHome }) => {
  const { meals, popularMeals, loading, error } = useMealContext();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.allContainer}>
      {isHome && (
        <>
          <SeeMoreButton to="/meals" />
          <h1 className={styles.popularMealHeader}>Top Rated Meals</h1>
        </>
      )}
      {!isHome && (
        <>
          <BackButton />
          <Search />
          <MealSort />
        </>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.grid}>
          {isHome
            ? popularMeals.map((meal) => (
                <Meal key={meal.id + meal.title} meal={meal} />
              ))
            : meals &&
              meals.map((meal) => (
                <Meal key={meal.id + meal.title} meal={meal} />
              ))}
        </div>
      )}
    </div>
  );
};

export default MealList;
