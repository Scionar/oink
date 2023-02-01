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

  const toggleButtonClasses = [styles.toggleButton];

  return (
    <div className={styles.accordion}>
      <div className={styles.summaryWrapper}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.toggleWrapper}>
          <button
            className={clsx({
              [styles.toggleButton]: true,
              [styles.toggleButtonExpanded]: isExpanded,
            })}
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
