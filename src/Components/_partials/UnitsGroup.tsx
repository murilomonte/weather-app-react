import React from "react";
import styles from "./UnitsGroup.module.css";

type UnitInput<T> = React.ComponentProps<"input"> & {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  title: string;
  name: string;
  options: { id: T; title: string }[];
};

const UnitsGroup = <T extends string>(props: UnitInput<T>) => {
  return (
    <div className={styles.radioGroup}>
      <p className={styles.title}>
        {props.title}
      </p>
      <div>
        {props.options.map((opt) => {
          return (
            <label key={opt.id} className={styles.radioLabel} htmlFor={opt.id}>
              <p>{opt.title}</p>
              <input
                type="radio"
                name={props.name}
                id={opt.id}
                checked={props.state === opt.id}
                value={opt.id}
                onChange={() => props.setState(opt.id)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default UnitsGroup;
