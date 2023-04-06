import React from "react";
import Meal from "../meal/Meal";
import styles from './MealList.module.css';
import Loader from "../loader/Loader";
import {useMealContext} from "../context/mealContext";

const MealList = ({isHome}) => {
    const {meals, loading, error} = useMealContext();

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.allContainer}>
            <div className={styles.grid}>

                {isHome ? meals.slice(0, 2).map((meal) => (
                        <Meal meal={meal} key={meal.id}/>
                    )) :
                    meals.map(meal => (
                        <Meal key={meal.id} meal={meal}/>
                    ))
                }
            </div>
        </div>
    );
}

export default MealList;