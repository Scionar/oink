import styles from './Backdrop.module.css';

type BackdropProps = {
  children: any;
};

export const Backdrop = ({ children }: BackdropProps) => (
  <div className={styles.backdrop}>{children}</div>
);
