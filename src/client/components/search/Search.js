import React, {useState} from 'react';
import {useMealContext} from '../context/mealContext';

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const {meals, setMeals,handleSearch} = useMealContext();


    return (
        <div className="styles.search styles.search-container">
            <input type="text" placeholder="Search" className="inputSearch" value={searchText} onChange={(event) => {
                setSearchText(event.target.value)
            }}/>
            <button onClick={() => {
                const data = filteredMeals(meals, searchText);
                setMeals(data)
            }}>Search
            </button>
        </div>
    )
}

export default Search;