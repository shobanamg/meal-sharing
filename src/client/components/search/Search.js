import React, { useState } from "react";
import { useMealContext } from "../context/mealContext";
import styles from "./Search.module.css";

import debounce from "lodash.debounce";

const debouncedHandle = debounce((callback, value) => {
  callback(value);
}, 1000);

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const { handleSearch } = useMealContext();

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search by meal title..."
        className={styles.input}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          debouncedHandle(handleSearch, searchTerm);
        }}
      />
    </div>
  );
}

export default Search;
