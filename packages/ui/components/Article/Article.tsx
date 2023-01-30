import * as React from "react";
import styles from "./Article.module.css";

type ArticleProps = {
  children: React.ReactElement;
};

export const Article = ({ children }: ArticleProps) => {
  return <article className={styles.root}>{children}</article>;
};
