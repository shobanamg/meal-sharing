import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMeals, fetchMealsWithTitle, sortingMeals } from "../../api";

export const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularMeals, setPopularMeals] = useState([]);
  const [sortKey, setSortKey] = useState("meal_time");
  const [sortDir, setSortDir] = useState("asc");
  const [isSavingReservation, setIsSavingReservation] = useState(false);

  useEffect(() => {
    fetchMeals()
      .then((data) => {
        setPopularMeals(data.filter((meal) => meal.avg_review_stars > 4));
        setMeals(data);
        setLoading(false);
        setIsSavingReservation(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        setIsSavingReservation(false);
      });
  }, [isSavingReservation]);

  const handleSearch = async (value) => {
    try {
      setLoading(true);
      fetchMealsWithTitle(value).then((data) => {
        setMeals(data);
        setError("");
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setError(`error fetching ${error.message}`);
    }
  };

  const sortMeals = (key, dir) => {
    sortingMeals(key, dir).then((data) => {
      setMeals(data);
      setSortKey(key);
      setSortDir(dir);
    });
  };

  const contextValue = {
    meals,
    popularMeals,
    loading,
    error,
    setError,
    handleSearch,
    sortKey,
    sortDir,
    sortMeals,
    setSortKey,
    setSortDir,
    isSavingReservation,
    setIsSavingReservation,
  };

  return (
    <MealContext.Provider value={contextValue}>{children}</MealContext.Provider>
  );
};

// custom hook to use the context
export function useMealContext() {
  return useContext(MealContext);
}
