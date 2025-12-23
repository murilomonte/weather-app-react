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
    weather_code: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: "°C" | "°F";
    weather_code: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily_units: {
    time: string;
    temperature_2m_max: "°C" | "°F";
    temperature_2m_min: "°C" | "°F";
    weather_code: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};

export interface WeatherData extends WeatherResponse {
  name: string;
  full_name: string;
}
