import * as React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = ({
  children,
  type = "button",
  disabled,
}: ButtonProps) => (
  <button type={type} disabled={disabled} className={styles.button}>
    {children}
  </button>
);
