// src/utils/weather/weatherIconAssets.ts
import sunny from "../assets/images/icon-sunny.webp";
import partlyCloud from "../assets/images/icon-partly-cloudy.webp";
import overcast from "../assets/images/icon-overcast.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import storm from "../assets/images/icon-storm.webp";

import type { WeatherIcon } from "./wmoCodeToIcon";

export const weatherIconAssets: Record<WeatherIcon, string> = {
  sunny,
  "partly-cloud": partlyCloud,
  overcast,
  rain,
  snow,
  storm,
};
