import React from "react";
import CurrentWeather from "./CurrentWeather";
import { useWeather } from "../../Context/WeatherContext";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import styles from "./Weather.module.css";

const Weather = () => {
  return (
    <section className={styles.weather}>
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
    </section>
  );
};

export default Weather;
