import React, {useState, useEffect} from "react";
import {fetchMeals} from "../../api";
import Meal from "../meal/Meal";
import styles from './MealList.module.css';



const MealList = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetchMeals()
      .then(data => {
          setMeals(data)
      })

    }, [])

        return (
            <div className={styles.grid}>
                {meals.map(meal => (
                    <Meal key={meal.id} meal={meal} />
                ))}
            </div>
        );
}

export default MealList;