import * as React from "react";
import styles from "./SpacerForm.module.css";

type SpacerFormProps = {
  children: React.ReactElement | React.ReactElement[];
};

export const SpacerForm = ({ children }: SpacerFormProps) => {
  return <div className={styles.root}>{children}</div>;
};
