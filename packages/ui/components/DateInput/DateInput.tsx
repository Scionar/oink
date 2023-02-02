import * as React from "react";
import { Label } from "../../common/Label/Label";
import styles from "./DateInput.module.css";

type DateInputProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
};

export const DateInput = ({ label, value, name, onChange }: DateInputProps) => {
  return (
    <div className={styles.container}>
      <Label>{label}</Label>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        type="date"
        name={name}
      />
    </div>
  );
};
