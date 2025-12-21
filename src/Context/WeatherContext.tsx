import React from "react";
import useFetch from "../Hooks/useFetch";
import type { WeatherResponse } from "./WeatherInterfaces";

const API_URL =
  "https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&timezone=auto";

type IWeatherContext = {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  weatherOptions: WeatherOptions;
  setWeatherOptions: React.Dispatch<React.SetStateAction<WeatherOptions>>;
};

type WeatherOptions = {
  latitude: string;
  longitude: string;
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
  const defaultOptions: WeatherOptions = {
    latitude: "-4.585808883688986", // TODO: pegar do user
    longitude: "-42.85883983395454",
    wind_speed_unit: "kmh",
    temperature_unit: "celsius",
    precipitation_unit: "mm",
    forecast_days: 7,
  };

  const [weatherOptions, setWeatherOptions] =
    React.useState<WeatherOptions>(defaultOptions);

  let url: string;

  if (weatherOptions) {
    const params = new URLSearchParams(
      Object.entries(weatherOptions).map(([key, value]) => [
        key,
        String(value),
      ]),
    );
    url = `${API_URL}&${params}`;
  } else {
    const params = new URLSearchParams(
      Object.entries(defaultOptions).map(([key, value]) => [
        key,
        String(value),
      ]),
    );
    url = `${API_URL}&${params}`;
  }

  const { data, loading, error } = useFetch<WeatherResponse>(url);
  console.log(data)
  return (
    <WeatherContext.Provider
      value={{ data, loading, error, weatherOptions, setWeatherOptions }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
