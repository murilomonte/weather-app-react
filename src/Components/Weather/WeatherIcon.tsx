// src/components/WeatherIcon.tsx
import type { ImgHTMLAttributes } from "react";
import { getIconFromWmo } from "../../utils/wmoCodeToIcon";
import { weatherIconAssets } from "../../utils/weatherIconAssets";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wmoCode: number | null | undefined;
};

export function WeatherIcon({
  wmoCode,
  ...imgProps
}: Props) {
  const icon = getIconFromWmo(wmoCode);

  return (
    <img
      src={weatherIconAssets[icon]}
      alt={icon}
      {...imgProps}
    />
  );
}
