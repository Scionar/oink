import * as React from "react";
import styles from "./Backdrop.module.css";

type BackdropProps = {
  children: string | string[] | React.ReactElement;
};

export const Backdrop = ({ children }: BackdropProps) => (
  <div className={styles.backdrop}>{children}</div>
);
