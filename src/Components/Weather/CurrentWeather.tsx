import { useWeather } from "../../Context/WeatherContext";
import styles from "./CurrentWeather.module.css";
import { WeatherIcon } from "./WeatherIcon";

const CurrentWeather = () => {
  const { data, loading } = useWeather();
  if (loading) {
    return (
      <div className={styles.currentWeather}>
        <section className={styles.currentTemperatureLoading}>
          <p>Loading...</p>
        </section>
        <section className={styles.currentConditions}>
          <div className={styles.condition}>
            <p>Feels like</p>
            <p>-</p>
          </div>
          <div className={styles.condition}>
            <p>Humidity</p>
            <p>-</p>
          </div>
          <div className={styles.condition}>
            <p>Wind speed</p>
            <p>-</p>
          </div>
          <div className={styles.condition}>
            <p>Preciptation</p>
            <p>-</p>
          </div>
        </section>
      </div>
    );
  }
  if (data) {
    return (
      <div className={styles.currentWeather}>
        <section className={styles.currentTemperature}>
          <div>
            <p className={styles.cityName}>{data.full_name}</p>
            <p className={styles.date}>{data.current.formated_time}</p>
          </div>
          <div className={styles.temperature}>
            <div className={styles.icon}>
              <WeatherIcon
                wmoCode={data.current.weather_code}
                width={48}
                height={48}
                loading="lazy"
              />
            </div>
            <p>
              {data.current.temperature_2m}
              {data.current_units.temperature_2m}
            </p>
          </div>
        </section>
        <section className={styles.currentConditions}>
          <div className={styles.condition}>
            <p>Feels like</p>
            <p>
              {data.current.apparent_temperature}
              {data.current_units.apparent_temperature}
            </p>
          </div>
          <div className={styles.condition}>
            <p>Humidity</p>
            <p>
              {data.current.relative_humidity_2m}
              {data.current_units.relative_humidity_2m}
            </p>
          </div>
          <div className={styles.condition}>
            <p>Wind speed</p>
            <p>
              {data.current.wind_speed_10m} {data.current_units.wind_speed_10m}
            </p>
          </div>
          <div className={styles.condition}>
            <p>Preciptation</p>
            <p>
              {data.current.precipitation} {data.current_units.precipitation}
            </p>
          </div>
        </section>
      </div>
    );
  }
};

export default CurrentWeather;
