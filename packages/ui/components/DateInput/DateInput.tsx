import * as React from "react";
import styles from "./DateInput.module.css";

type DateInputProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export const DateInput = ({ label, value, onChange }: DateInputProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        type="date"
      />
    </div>
  );
};
