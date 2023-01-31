import * as React from "react";
import styles from "./Snout.module.css";

type SnoutProps = {
  style: React.AllHTMLAttributes<HTMLSpanElement>["style"];
};

export const Snout = ({ style }: SnoutProps) => (
  <span className={styles.root} style={style}>
    🐽
  </span>
);
