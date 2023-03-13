import React, {useState, useEffect} from "react";
import {fetchMeals} from "../api";


const MealList = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetchMeals()
      .then(data => {
          setMeals(data)
      })

    }, [])

    return (
        <div>
            <h1>Meal List</h1>
            {meals.map(meal => (
                <li key={meal.id}>
                    <h2>Meal Title:{meal.title}</h2>
                    <p>Meal Description:{meal.description}</p>
                    <p>Meal Price:{meal.price}</p>
                </li>
            ))}
        </div>
    )
}

export default MealList;