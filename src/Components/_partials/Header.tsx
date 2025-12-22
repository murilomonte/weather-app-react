import React from "react";
import LogoSVG from "../../assets/images/logo.svg?react";
import styles from "./Header.module.css";
import SettingsSVG from "../../assets/images/icon-units.svg?react";
import DownArrowSVG from "../../assets/images/icon-dropdown.svg?react";
import { useWeather } from "../../Context/WeatherContext";
import UnitsGroup from "./UnitsGroup";

interface UnitOptions<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  title: string;
  name: string;
  options: { id: T; title: string }[];
}

type Units = "imperial" | "metric";
type TempUnits = "celsius" | "fahrenheit";
type WindUnits = "kmh" | "mph";
type PreciptUnits = "mm" | "inch";

const Header = () => {
  const [temperature, setTemperature] = React.useState<TempUnits>("celsius");
  const [wind, setWind] = React.useState<WindUnits>("mph");
  const [preciptation, setPreciptation] = React.useState<PreciptUnits>("mm");

  const tempOpt: UnitOptions<TempUnits> = {
    state: temperature,
    setState: setTemperature,
    title: "Temperature",
    name: "temperature",
    options: [
      { id: "celsius", title: "Celcius (°C)" },
      { id: "fahrenheit", title: "Fahrenheit (°F)" },
    ],
  };

  const windOpt: UnitOptions<WindUnits> = {
    state: wind,
    setState: setWind,
    title: "Wind Speed",
    name: "wind_speed",
    options: [
      { id: "kmh", title: "km/h" },
      { id: "mph", title: "mph" },
    ],
  };

  const preciptOpt: UnitOptions<PreciptUnits> = {
    state: preciptation,
    setState: setPreciptation,
    title: "Preciptation",
    name: "preciptation",
    options: [
      { id: "mm", title: "Milimiters (mm)" },
      { id: "inch", title: "Inches (in)" },
    ],
  };

  const [dropdown, setDropdown] = React.useState(false);
  const [mode, setMode] = React.useState<Units>("imperial");

  const { data, weatherOptions, setWeatherOptions } = useWeather();

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
      <div className={styles.wrapper}>
        <button
          className={styles.unitsButton}
          onClick={() => setDropdown(!dropdown)}
        >
          <SettingsSVG />
          <p>Units</p>
          <DownArrowSVG />
        </button>
        <div
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
            state={tempOpt.state}
            setState={tempOpt.setState}
            name={tempOpt.name}
            options={tempOpt.options}
            title={tempOpt.title}
          />

          <UnitsGroup
            state={windOpt.state}
            setState={windOpt.setState}
            name={windOpt.name}
            options={windOpt.options}
            title={windOpt.title}
          />

          <UnitsGroup
            state={preciptOpt.state}
            setState={preciptOpt.setState}
            name={preciptOpt.name}
            options={preciptOpt.options}
            title={preciptOpt.title}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
