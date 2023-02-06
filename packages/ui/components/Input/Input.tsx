import * as React from "react";
import { Label } from "../../common/Label/Label";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
};

export const Input = ({
  label,
  value,
  name,
  required,
  type,
  onChange,
}: InputProps) => {
  return (
    <div className={styles.container}>
      <Label required={required}>{label}</Label>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
};
