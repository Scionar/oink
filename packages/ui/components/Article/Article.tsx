import styles from './Article.module.css';

type ArticleProps = {
  children: any;
};

export const Article = ({ children }: ArticleProps) => {
  return <article className={styles.root}>{children}</article>;
};
