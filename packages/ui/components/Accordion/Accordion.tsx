import * as React from "react";
import styles from "./Accordion.module.css";
import { clsx } from "clsx";

type AccordionProps = {
  children: React.ReactNode | React.ReactNode[];
  summary: string;
};

export const Accordion = ({ children, summary }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleOnClickHandler = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={clsx({
        [styles.accordion]: true,
        [styles.accordionExpanded]: isExpanded,
      })}
    >
      <div className={styles.summaryWrapper} onClick={toggleOnClickHandler}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.toggleWrapper}>
          <button
            className={styles.toggleButton}
            onClick={toggleOnClickHandler}
          >
            &#10148;
          </button>
        </div>
      </div>
      {isExpanded && <div className={styles.content}>{children}</div>}
    </div>
  );
};
