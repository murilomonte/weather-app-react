import React from "react";
import styles from "./Seach.module.css";
import SearchSVG from '../assets/images/icon-search.svg?react';

const Search = () => {
  const [search, setSearch] = React.useState("");

  function handleInput({ target }: { target: HTMLInputElement }) {
    setSearch(target.value);
    console.log(search)
  }

  return (
    <section className={styles.searchContainer}>
      <h1 className={styles.title}>How's the sky looking today?</h1>
      <input
      className={styles.searchField}
          type="text"
          name="search"
          placeholder="Search for a place"
          onChange={handleInput}
        />
      <button className={styles.searchButton}>Search</button>
    </section>
  );
};

export default Search;
