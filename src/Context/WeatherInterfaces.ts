export type WeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: "°C" | "°F";
    relative_humidity_2m: string;
    apparent_temperature: "°C" | "°F";
    precipitation: "mm" | "inch";
    wind_speed_10m: "km/h" | "mph";
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    wind_speed_10m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: "°C" | "°F";
  };
  hourly: {
    time: string[];
    temperature_2m: [number, number];
  };
  daily_units: {
    time: string;
    temperature_2m_max: "°C" | "°F";
    temperature_2m_min: "°C" | "°F";
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};
