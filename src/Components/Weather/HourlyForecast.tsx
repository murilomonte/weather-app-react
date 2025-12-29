import React from "react";
import { useWeather } from "../../Context/WeatherContext";
import { extractDayHour } from "../../utils/strToDate";
import { WeatherIcon } from "./WeatherIcon";
import styles from "./HourlyForecast.module.css";
import DownArrowSVG from "../../assets/images/icon-dropdown.svg?react";

type HourlyWeather = {
  day: string;
  hour: number;
  temp: number;
  code: number;
};

const HourlyForecast = () => {
  const { data, loading } = useWeather();
  const [forecast, setForecast] = React.useState<HourlyWeather[]>();
  const [activeForecast, setActiveForecast] = React.useState<string>();
  const [dropdown, setDropdown] = React.useState(false);
  const dropdownMenu = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownMenu.current &&
        !dropdownMenu.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  React.useEffect(() => {
    if (!data) return;
    const hourly = data.hourly;

    let hourlyList: HourlyWeather[] = [];

    hourly.time.map((_, i) => {
      const { hour, day } = extractDayHour(hourly.time[i]);
      hourlyList.push({
        day: day,
        hour: hour,
        temp: hourly.temperature_2m[i],
        code: hourly.weather_code[i],
      });
    });

    setForecast(hourlyList);
    setActiveForecast(hourlyList[0].day);
  }, [data]);

  React.useEffect(() => {
    if (dropdown) {
    }
  }, [dropdown]);

  function uniqueDays(list: HourlyWeather[]): { day: string }[] {
    return Array.from(new Map(list.map((item) => [item.day, item])).values());
  }

  if (loading)
    return (
      <section className={styles.hourlyForecastContainer}>
        <div className={styles.forecastHeader}>
          <h2>Hourly forecast</h2>
          <div className={styles.forecastDropdownWrapper}>
            <button>
              - <DownArrowSVG />
            </button>
          </div>
        </div>
        <div className={styles.hourlyForecast}>
          <div className={styles.forecastLoading}></div>
          <div className={styles.forecastLoading}></div>
          <div className={styles.forecastLoading}></div>
          <div className={styles.forecastLoading}></div>
          <div className={styles.forecastLoading}></div>
          <div className={styles.forecastLoading}></div>
        </div>
      </section>
    );
  if (forecast)
    return (
      <section className={styles.hourlyForecastContainer}>
        <div className={styles.forecastHeader}>
          <h2>Hourly forecast</h2>
          <div ref={dropdownMenu} className={styles.forecastDropdownWrapper}>
            <button onClick={() => setDropdown((prev) => !prev)}>
              {activeForecast}
              <DownArrowSVG />
            </button>
            <div
              className={`${styles.dropdown} ${dropdown ? styles.active : ""}`}
            >
              {uniqueDays(forecast).map((item) => {
                return (
                  <button
                    onClick={() => {
                      setActiveForecast(item.day);
                      setDropdown(false);
                    }}
                    key={item.day}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.hourlyForecast}>
          {forecast
            ?.filter((item) => {
              return item.day == activeForecast;
            })
            .map((item) => {
              return (
                <div key={item.hour} className={styles.forecast}>
                  <div>
                    <WeatherIcon wmoCode={item.code} loading="lazy" />
                    {item.hour > 12
                      ? item.hour - 12 + " PM"
                      : item.hour + " AM"}
                  </div>
                  <p className={styles.temp}>{Math.round(item.temp)}</p>
                </div>
              );
            })}
        </div>
      </section>
    );
  return null;
};

export default HourlyForecast;
