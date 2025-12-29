import React from "react";
import useFetch from "../Hooks/useFetch";
import type { WeatherData, WeatherResponse } from "./WeatherInterfaces";

const API_URL =
  "https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,weather_code,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&timezone=auto";

type IWeatherContext = {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  weatherOptions: WeatherOptions;
  setWeatherOptions: React.Dispatch<React.SetStateAction<WeatherOptions>>;
};

type WeatherOptions = {
  name: string | null;
  full_name: string | null;

  latitude: string | null;
  longitude: string | null;
  wind_speed_unit: "mph" | "kmh";
  temperature_unit: "fahrenheit" | "celsius";
  precipitation_unit: "inch" | "mm";
  forecast_days: 1 | 7;
};

const WeatherContext = React.createContext<IWeatherContext | null>(null);

export const useWeather = () => {
  const context = React.useContext(WeatherContext);
  if (!context)
    throw new Error("useWeather precisa estar em WeatherContext.Provider");
  return context;
};

export const WeatherProvider = ({ children }: React.PropsWithChildren) => {
  const [weatherOptions, setWeatherOptions] = React.useState<WeatherOptions>({
    name: null,
    full_name: null,
    latitude: null,
    longitude: null,

    wind_speed_unit: "kmh",
    temperature_unit: "celsius",
    precipitation_unit: "mm",
    forecast_days: 7,
  });

  let data: WeatherData | null = null;
  let loading: boolean = false;
  let error: string | null = null;

  const ignore = ["name", "full_name"];

  const hasRequiredOptions =
    weatherOptions.latitude !== null &&
    weatherOptions.longitude !== null &&
    weatherOptions.name !== null &&
    weatherOptions.full_name !== null;

  const params = hasRequiredOptions
    ? new URLSearchParams(
        Object.entries(weatherOptions)
          .filter(([key]) => !ignore.includes(key))
          .map(([key, value]) => [key, String(value)]),
      ).toString()
    : null;
  const url = params ? `${API_URL}&${params}` : null;

  const response = useFetch<WeatherResponse>(url);

  if (
    response.data &&
    weatherOptions.name !== null &&
    weatherOptions.full_name !== null
  ) {
    const date = new Date(response.data.current.time);

    const formatted = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);

    data = {
      name: weatherOptions.name,
      full_name: weatherOptions.full_name,
      ...response.data,
    };
    data.current.formated_time = formatted;
  }

  loading = response.loading;
  error = response.error;

  return (
    <WeatherContext.Provider
      value={{
        data,
        loading,
        error,
        weatherOptions,
        setWeatherOptions,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
