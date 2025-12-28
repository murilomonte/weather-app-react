import React from "react";
import styles from "./Seach.module.css";
import { useWeather } from "../Context/WeatherContext";
import useGeocode, { type CityInfo } from "../Hooks/useGeocode";

const Search = () => {
  const [search, setSearch] = React.useState("");

  const weather = useWeather();
  const geocode = useGeocode();

  const searchResults = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      console.log(event);
      if (
        searchResults.current &&
        !searchResults.current.contains(event.target as Node)
      ) {
        geocode.setData(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleInput({ target }: { target: HTMLInputElement }) {
    setSearch(target.value);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    geocode.request(search);
  }

  function setWeather(city: CityInfo) {
    const parts = city.fullName.split(",").map((p) => p.trim());
    const fullName = `${parts[0]}, ${parts.at(-1)}`;

    weather.setWeatherOptions({
      ...weather.weatherOptions,
      name: city.name,
      full_name: fullName,
      latitude: city.lat,
      longitude: city.lon,
    });
    geocode.setData(null);
  }

  return (
    <div className={styles.searchContainer}>
      <h1 className={styles.title}>How's the sky looking today?</h1>
      <form onSubmit={handleSearch} className={styles.searchArea}>
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
            <div ref={searchResults} className={styles.searchResult}>
              {geocode.data.length > 0 ? (
                geocode.data.map((city) => {
                  return (
                    <button
                      key={city.lat}
                      title={city.fullName}
                      onClick={() => setWeather(city)}
                    >
                      {city.name}
                    </button>
                  );
                })
              ) : (
                <p>No cities found.</p>
              )}
            </div>
          ) : null}
          {geocode.loading ? (
            <div className={styles.searchResultLoading}>
              <p>Searching in progress...</p>
            </div>
          ) : null}
        </div>
        <button className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
};

export default Search;
