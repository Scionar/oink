import styles from "./Panel.module.css";

type PanelProps = {
  children: any;
};

export const Panel = ({ children }: PanelProps) => (
  <section className={styles.panel}>{children}</section>
);
