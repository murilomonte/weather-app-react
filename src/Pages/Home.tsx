import Search from "../Components/Search";
import Weather from "../Components/Weather/Weather";
import styles from "./Home.module.css";
import RetrySVG from "../assets/images/icon-retry.svg?react";
import ErrorSVG from '../assets/images/icon-error.svg?react'
import { useWeather } from "../Context/WeatherContext";

const Home = () => {
  const { error, weatherOptions, setWeatherOptions } = useWeather();
  console.log("error", error);

  function handleTryAgain() {
    setWeatherOptions({
      ...weatherOptions,
      name: null,
      full_name: null,
      latitude: null,
      longitude: null,
    });
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ErrorSVG/>
        <h1 className={styles.errorTitle}>Something went wrong</h1>
        <p className={styles.errorMessage}>
          We couldn't connect to the server (API Error). Please try again in a
          few moments.
        </p>
        <button className={styles.errorRetryButton} onClick={handleTryAgain}><RetrySVG/>Retry</button>
      </div>
    );
  }

  return (
    <main>
      <Search />
      <Weather />
    </main>
  );
};

export default Home;
