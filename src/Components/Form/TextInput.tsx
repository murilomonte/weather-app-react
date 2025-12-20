import React from "react";
import type { RadioGroupOptions } from "./RadioGroup";
import styles from "./TextInput.module.css";

const TextInput = ({
  placeholder,
  id,
  name,
  setState,
}: {
  placeholder: string;
  id: string;
  name: string;
  setState: () => void;
}) => {
  return <input type="text" id={id} name={name} placeholder={placeholder} />;
};

export default TextInput;
