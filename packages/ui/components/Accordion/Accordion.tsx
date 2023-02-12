import * as React from "react";
import IconChevron from "../../icons/IconChevron";
import styles from "./Accordion.module.css";

type AccordionProps = {
  children: React.ReactNode | React.ReactNode[];
  summary: string;
};

export const Accordion = ({ children, summary }: AccordionProps) => {
  return (
    <details className={styles.accordion}>
      <summary className={styles.summaryWrapper}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.toggleWrapper}>
          <div className={styles.toggleButton}>
            <IconChevron size={13} />
          </div>
        </div>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
};
