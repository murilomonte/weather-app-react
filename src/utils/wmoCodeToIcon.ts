// src/utils/weather/wmoCodeToIcon.ts
export type WeatherIcon =
  | "sunny"
  | "partly-cloud"
  | "overcast"
  | "rain"
  | "snow"
  | "storm";

export type WeatherCode =
  | 0 | 1 | 2 | 3
  | 45 | 48
  | 51 | 53 | 55
  | 56 | 57
  | 61 | 63 | 65
  | 66 | 67
  | 71 | 73 | 75
  | 77
  | 80 | 81 | 82
  | 85 | 86
  | 95 | 96 | 99;

export const wmoCodeToIcon: Record<WeatherCode, WeatherIcon> = {
  0: "sunny",
  1: "partly-cloud",
  2: "partly-cloud",
  3: "overcast",

  45: "overcast",
  48: "overcast",

  51: "rain",
  53: "rain",
  55: "rain",
  56: "rain",
  57: "rain",

  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",

  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",

  80: "rain",
  81: "rain",
  82: "rain",

  85: "snow",
  86: "snow",

  95: "storm",
  96: "storm",
  99: "storm",
};

export function getIconFromWmo(
  code: number | null | undefined,
): WeatherIcon {
  if (code == null) return "sunny";
  return wmoCodeToIcon[code as WeatherCode] ?? "sunny";
}
