import * as React from "react";
import { clsx } from "clsx";
import styles from "./Button.module.css";

type ButtonProps = {
  children: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "positive";
};

export const Button = ({
  children,
  type = "button",
  disabled,
  variant,
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={clsx({
      [styles.button]: true,
      [styles.positive]: variant === "positive",
    })}
  >
    {children}
    {disabled && " (disabled)"}
  </button>
);
