import * as React from "react";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export const Input = ({ label, value, onChange }: InputProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} value={value} onChange={onChange} />
    </div>
  );
};
