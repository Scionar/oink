import * as React from "react";
import { Label } from "../../common/Label/Label";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export const Input = ({ label, value, onChange }: InputProps) => {
  return (
    <div className={styles.container}>
      <Label>{label}</Label>
      <input className={styles.input} value={value} onChange={onChange} />
    </div>
  );
};
