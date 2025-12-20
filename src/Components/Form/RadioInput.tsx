import React from "react";
import styles from "./RadioInput.module.css";

const RadioInput = ({
  title,
  id,
  name,
  checked,
  setState,
}: {
  title: string;
  id: string;
  name: string;
  checked: boolean;
  setState: () => void;
}) => {
  return (
    <div>
      <label htmlFor={id} className={styles.radioLabel}>
        <p>{title}</p>
        <input
          type="radio"
          name={name}
          id={id}
          checked={checked}
          value={id}
          onChange={setState}
        />
      </label>
    </div>
  );
};

export default RadioInput;
