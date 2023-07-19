import * as React from 'react';
import styles from './BigEmoji.module.css';

type BigEmojiProps = {
  style: React.AllHTMLAttributes<HTMLSpanElement>['style'];
  children: string;
};

export const BigEmoji = ({ style, children }: BigEmojiProps) => (
  <span className={styles.root} style={style}>
    {children}
  </span>
);
