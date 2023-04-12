import React from "react";
import { useMealContext } from "../context/mealContext";
import styles from "./MealSort.module.css";

const MealSort = () => {
  const { sortKey, sortDir, meals, sortMeals } = useMealContext();

  const handleSortChange = (event) => {
    const { value: newSortKey } = event.target;
    sortMeals(newSortKey, sortDir);
  };

  const handleButtonClick = () => {
    const newSortDir = sortDir === "asc" ? "desc" : "asc";
    sortMeals(sortKey, newSortDir);
  };

  return (
    <>
      {meals.length > 0 && (
        <div className={styles.mealSort}>
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortKey} onChange={handleSortChange}>
            <option key="meal_time" value="meal_time">
              Date
            </option>
            <option key="title" value="title">
              Title
            </option>
            <option key="price" value="price">
              Price
            </option>
            <option key="location" value="location">
              Location
            </option>
          </select>

          <button
            className={sortDir === "asc" ? styles.asc : styles.desc}
            onClick={handleButtonClick}
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </button>
        </div>
      )}
    </>
  );
};

export default MealSort;
