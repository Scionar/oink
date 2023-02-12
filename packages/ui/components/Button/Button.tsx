import * as React from "react";
import { clsx } from "clsx";
import styles from "./Button.module.css";

type ButtonProps = {
  children: string | string[] | React.ReactElement;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "positive";
  onClick?: () => void;
};

export const Button = ({
  children,
  type = "button",
  disabled,
  variant,
  onClick,
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={clsx({
      [styles.button]: true,
      [styles.positive]: variant === "positive",
    })}
    onClick={onClick}
  >
    {children}
    {disabled && " (disabled)"}
  </button>
);
