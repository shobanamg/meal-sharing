import React, {useState} from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MealList from "./components/meallist/MealList";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import {MealProvider} from "./components/context/mealContext";
import MealDetails from "./components/mealDetail/MealDetails";


function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Router id="main">
            <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
            <div className="container">
                <Switch className="data">
                    <MealProvider>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/meals">
                            <MealList isHome={false}/>
                        </Route>
                        <Route exact path="/meals/:id">
                            <MealDetails/>
                        </Route>
                    </MealProvider>
                </Switch>
            </div>
        </Router>
    )
        ;
}

export default App;
