import React from 'react';
import MealList from "../meallist/MealList";

const Home = () => {
    return (<>
            <MealList isHome={true}/>
           </>
    )

};

export default Home;