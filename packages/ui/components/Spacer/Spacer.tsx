import * as React from "react";
import { clsx } from "clsx";
import styles from "./Spacer.module.css";

type SpacerProps = {
  children: React.ReactElement | React.ReactElement[];
  variant?: "form";
};

export const Spacer = ({ children, variant }: SpacerProps) => {
  return (
    <div
      className={clsx({
        [styles.spacer]: true,
        [styles.default]: variant === undefined,
        [styles.form]: variant === "form",
      })}
    >
      {children}
    </div>
  );
};