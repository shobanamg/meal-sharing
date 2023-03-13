import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import MealList from "./components/MealList";

function App() {
  return (
    <Router>
      <Route exact path="/">
       <MealList/>
      </Route>
    </Router>
  );
}

export default App;
