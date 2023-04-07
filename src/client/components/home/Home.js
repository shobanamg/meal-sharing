import React from 'react';
import MealList from "../meallist/MealList";
import styles from './Home.module.css';
import Hero from "../hero/Hero";

const Home = () => {
    return (
        <div className={styles.container}>
            <Hero/>
            <MealList isHome={true}/>
        </div>
    )

};

export default Home;