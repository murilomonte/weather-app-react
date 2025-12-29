import React from "react";
import LogoSVG from "../../assets/images/logo.svg?react";
import styles from "./Header.module.css";
import SettingsSVG from "../../assets/images/icon-units.svg?react";
import DownArrowSVG from "../../assets/images/icon-dropdown.svg?react";
import { useWeather } from "../../Context/WeatherContext";
import UnitsGroup from "./UnitsGroup";

type Units = "imperial" | "metric";
type TempUnits = "celsius" | "fahrenheit";
type WindUnits = "kmh" | "mph";
type PreciptUnits = "mm" | "inch";

const Header = () => {
  const [temperature, setTemperature] = React.useState<TempUnits>("celsius");
  const [wind, setWind] = React.useState<WindUnits>("mph");
  const [preciptation, setPreciptation] = React.useState<PreciptUnits>("mm");

  const [dropdown, setDropdown] = React.useState(false);
  const [mode, setMode] = React.useState<Units>("metric");
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

  const { weatherOptions, setWeatherOptions } = useWeather();

  React.useEffect(() => {
    if (mode == "imperial") {
      setTemperature("fahrenheit");
      setWind("mph");
      setPreciptation("inch");
    } else if (mode === "metric") {
      setTemperature("celsius");
      setWind("kmh");
      setPreciptation("mm");
    }
  }, [mode]);

  React.useEffect(() => {
    setWeatherOptions({
      ...weatherOptions,
      temperature_unit: temperature,
      wind_speed_unit: wind,
      precipitation_unit: preciptation,
    });
  }, [temperature, wind, preciptation]);

  return (
    <header>
      <LogoSVG />
      <div ref={dropdownMenu} className={styles.wrapper}>
        <button
          className={styles.unitsButton}
          onClick={() => setDropdown(!dropdown)}
        >
          <SettingsSVG />
          <p>Units</p>
          <DownArrowSVG />
        </button>
        <div
          inert={!dropdown}
          className={`${styles.unitsMenu} ${dropdown ? styles.active : ""}`}
          id="unitsMenu"
        >
          <button
            className={styles.switchButton}
            onClick={() =>
              setMode((prev) => (prev == "imperial" ? "metric" : "imperial"))
            }
          >
            Switch to {mode == "imperial" ? "metric" : "imperial"}
          </button>

          <UnitsGroup
            title={"Temperature"}
            name={"temperature"}
            state={temperature}
            setState={setTemperature}
            options={[
              { id: "celsius", title: "Celcius (°C)" },
              { id: "fahrenheit", title: "Fahrenheit (°F)" },
            ]}
          />

          <UnitsGroup
            title={"Wind Speed"}
            name={"wind_speed"}
            state={wind}
            setState={setWind}
            options={[
              { id: "kmh", title: "km/h" },
              { id: "mph", title: "mph" },
            ]}
          />

          <UnitsGroup
            title={"Preciptation"}
            name={"preciptation"}
            state={preciptation}
            setState={setPreciptation}
            options={[
              { id: "mm", title: "Milimiters (mm)" },
              { id: "inch", title: "Inches (in)" },
            ]}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
