import * as React from "react";
import styles from "./Label.module.css";

type LabelProps = {
  children: string;
};

export const Label = ({ children }: LabelProps) => (
  <label className={styles.label}>{children}</label>
);
