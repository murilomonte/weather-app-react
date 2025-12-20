import React, { type PropsWithChildren } from "react";
import RadioInput from "./RadioInput";
import style from './RadioGroup.module.css';

export type RadioGroupOptions = { id: string; name: string }[];

type RadioGroupProps = React.PropsWithChildren<{
  title: string;
  name: string;
  options: RadioGroupOptions;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}>;

const RadioGroup = (props: RadioGroupProps) => {
  return (
    <div className={style.radioGroup}>
      <p className={style.title}>
        {props.title} - {props.state}
      </p>
      {props.options.map((opt) => {
        return (
          <RadioInput
            key={opt.id}
            id={opt.id}
            name={props.name}
            title={opt.name}
            checked={props.state === opt.id}
            setState={() => props.setState(opt.id)}
          />
        );
      })}
    </div>
  );
};

export default RadioGroup;
