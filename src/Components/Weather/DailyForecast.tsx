import React from "react";
import { useWeather } from "../../Context/WeatherContext";
import styles from "./DailyForecast.module.css";
import { WeatherIcon } from "./WeatherIcon";

type DailyWeather = { time: string; max: string; min: string; code: number };

const DailyForecast = () => {
  const { data, loading } = useWeather();
  const [weather, setWeather] = React.useState<DailyWeather[]>();

  React.useEffect(() => {
    if (!data) return;
    const daily = data.daily;

    function strToWeekDay(str: string) {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
      }).format(new Date(str));
    }
    let dailyList: DailyWeather[] = [];
    daily.time.map((_, i) => {
      const maxTemp = `${Math.round(daily.temperature_2m_max[i])}°`;
      const minTemp = `${Math.round(daily.temperature_2m_min[i])}°`;

      dailyList.push({
        time: strToWeekDay(daily.time[i]),
        max: maxTemp,
        min: minTemp,
        code: daily.weather_code[i],
      });
    });
    setWeather(dailyList);
  }, [data]);

  if (loading)
    return (
      <section className={styles.dailyForecastContainer}>
        <h2>Daily Forecast</h2>
        <div className={styles.dailyForecastLoading}>
          {Array.from({ length: 7 }).map((_, i) => {
            return <div key={i} className={styles.dayForecast}></div>;
          })}
        </div>
      </section>
    );
  if (data) {
    return (
      <section className={styles.dailyForecastContainer}>
        <h2>Daily Forecast</h2>
        <div className={styles.dailyForecast}>
          {weather?.length
            ? weather.map((day) => {
                return (
                  <div key={day.time} className={styles.dayForecast}>
                    <div className={styles.dayWeek}>{day.time}</div>
                    <div className={styles.dayIcon}>
                      <WeatherIcon
                        wmoCode={day.code}
                        width={48}
                        height={48}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.dayMaxMinTemp}>
                      <p>{day.max}</p>
                      <p>{day.min}</p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </section>
    );
  }
};

export default DailyForecast;
