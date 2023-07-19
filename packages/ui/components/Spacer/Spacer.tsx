import { clsx } from 'clsx';
import styles from './Spacer.module.css';

type SpacerProps = {
  children: any;
  variant?: 'form' | 'article';
};

export const Spacer = ({ children, variant }: SpacerProps) => {
  return (
    <div
      className={clsx({
        [styles.spacer]: true,
        [styles.default]: variant === undefined,
        [styles.form]: variant === 'form',
        [styles.article]: variant === 'article',
      })}
    >
      {children}
    </div>
  );
};
