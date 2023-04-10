import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMeals, fetchMealsWithTitle } from "../../api";

export const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularMeals, setPopularMeals] = useState([]);
  const [sortKey, setSortKey] = useState("meal_time");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    fetchMeals()
      .then((data) => {
        setPopularMeals(data.filter((meal) => meal.avg_review_stars > 4));
        setMeals(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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
    const sortedMeals = [...meals].sort((a, b) => {
      if (dir === "asc") {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      } else if (dir === "desc") {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      }
    });
    setMeals(sortedMeals);
    setSortKey(key);
    setSortDir(dir);
  };

  const contextValue = {
    meals,
    popularMeals,
    setMeals,
    loading,
    error,
    setError,
    handleSearch,
    sortKey,
    sortDir,
    sortMeals,
    setSortKey,
    setSortDir,
  };

  return (
    <MealContext.Provider value={contextValue}>{children}</MealContext.Provider>
  );
};

// custom hook to use the context
export function useMealContext() {
  return useContext(MealContext);
}
