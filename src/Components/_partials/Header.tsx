import React from "react";
import LogoSVG from "../../assets/images/logo.svg?react";
import RadioInput from "../Form/RadioInput";
import styles from "./Header.module.css";
import RadioGroup, { type RadioGroupOptions } from "../Form/RadioGroup";
import SettingsSVG from '../../assets/images/icon-units.svg?react';
import DownArrowSVG from '../../assets/images/icon-dropdown.svg?react';

const temperatureOpt: RadioGroupOptions = [
  { id: "c", name: "Celcius (°C)" },
  { id: "f", name: "Fahrenheit (°F)" },
];

const windOpt: RadioGroupOptions = [
  { id: "kmh", name: "km/h" },
  { id: "mph", name: "mph" },
];

const preciptationOpt: RadioGroupOptions = [
  { id: "mm", name: "Milimiters (mm)" },
  { id: "in", name: "Inches (in)" },
];
const Header = () => {
  const [dropdown, setDropdown] = React.useState(false);
  const [mode, setMode] = React.useState<"imperial" | "metric">("imperial");

  React.useEffect(() => {
    if (mode == "imperial") {
      setTemperature(temperatureOpt[1].id);
      setWind(windOpt[1].id);
      setPreciptation(preciptationOpt[1].id);
    } else if (mode === "metric") {
      setTemperature(temperatureOpt[0].id);
      setWind(windOpt[0].id);
      setPreciptation(preciptationOpt[0].id);
    }
  }, [mode]);

  const [temperature, setTemperature] = React.useState(temperatureOpt[0].id);
  const [wind, setWind] = React.useState(windOpt[0].id);
  const [preciptation, setPreciptation] = React.useState(preciptationOpt[0].id);

  return (
    <header>
      <LogoSVG />
      <div className={styles.wrapper}>
        <button
          className={styles.unitsButton}
          onClick={() => setDropdown(!dropdown)}
        >
          <SettingsSVG/>
          <p>Units</p>
          <DownArrowSVG/>
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
          <RadioGroup
            state={temperature}
            setState={setTemperature}
            name="temperature"
            options={temperatureOpt}
            title="Temperature"
          />
          <RadioGroup
            state={wind}
            setState={setWind}
            name="wind"
            options={windOpt}
            title="Wind Speed"
          />
          <RadioGroup
            state={preciptation}
            setState={setPreciptation}
            name="preciptation"
            options={preciptationOpt}
            title="Preciptation"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
