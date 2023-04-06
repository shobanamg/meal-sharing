import React, { createContext, useContext, useState, useEffect } from "react";
import {fetchMeals} from "../../api";

export const MealContext = createContext();

export const MealProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchMeals()
            .then(data => {
                setMeals(data)
                setLoading(false)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [])

    const handleSearch = async (value) => {
        try {
            setLoading(true);
            fetchMeals(value)
                .then(data => {
                    setMeals(data);
            setError("");
            setLoading(false);
        });
            }catch (error) {
            setLoading(false);
            setError(`error fetching ${error.message}`);
        }
    };

    const contextValue = {
        meals,
        setMeals,
        loading,
        error,
        setError
    };

    return (
        <MealContext.Provider value ={contextValue}>
            {children}
        </MealContext.Provider>
    )
};

// custom hook to use the context
export function useMealContext() {
    return useContext(MealContext);
}