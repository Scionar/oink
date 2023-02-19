import * as React from "react";
import styles from "./Panel.module.css";

type PanelProps = {
  children: string | string[] | React.ReactElement;
};

export const Panel = ({ children }: PanelProps) => (
  <section className={styles.panel}>{children}</section>
);
