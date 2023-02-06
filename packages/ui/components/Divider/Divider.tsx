import * as React from "react";
import styles from "./Divider.module.css";

type DividerProps = {
  name?: string;
};

export const Divider = ({ name }: DividerProps) => (
  <div className={styles.divider}>
    <div className={styles.line} />
    {!!name && (
      <>
        <span className={styles.name}>{name}</span>
        <div className={styles.line} />
      </>
    )}
  </div>
);
