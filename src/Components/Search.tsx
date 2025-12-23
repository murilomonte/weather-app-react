import React from "react";
import styles from "./Seach.module.css";
import { useWeather } from "../Context/WeatherContext";
import useGeocode from "../Hooks/useGeocode";

const Search = () => {
  const [search, setSearch] = React.useState("");

  const weather = useWeather();
  const geocode = useGeocode();

  function handleInput({ target }: { target: HTMLInputElement }) {
    setSearch(target.value);
  }

  function handleSearch() {
    geocode.request(search);
    const cities = geocode.data;
    console.log(cities);
  }

  function setWeather({ lat, lon }: { lat: string; lon: string }) {
    console.log({lat, lon})
    weather.setWeatherOptions({
      ...weather.weatherOptions,
      latitude: lat,
      longitude: lon,
    });
    geocode.setData(null);
  }

  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.title}>How's the sky looking today?</h1>
      <div className={styles.searchArea}>
        <div className={styles.searchFieldWrapper}>
          <label htmlFor="search" className={styles.searchFieldLabel}>
            <input
              className={styles.searchField}
              type="text"
              name="search"
              placeholder="Search for a place"
              onChange={handleInput}
            />
          </label>
          {geocode.data ? (
            <div className={styles.searchResult}>
              {geocode.data.map((city) => {
                return (
                  <button
                    key={city.lat}
                    title={city.fullName}
                    onClick={() => setWeather({ lat: city.lat, lon: city.lon })}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>
          ) : null}
          {geocode.loading ? (
            <div className={styles.searchResultLoading}>
              <p>Searching in progress...</p>
            </div>
          ) : null}
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
