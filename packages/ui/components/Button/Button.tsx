import { clsx } from 'clsx';
import styles from './Button.module.css';

type ButtonProps = {
  children: any;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'positive' | 'creative';
  onClick?: () => void;
};

export const Button = ({
  children,
  type = 'button',
  disabled,
  variant,
  onClick,
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={clsx({
      [styles.button]: true,
      [styles.positive]: variant === 'positive',
      [styles.creative]: variant === 'creative',
    })}
    onClick={onClick}
  >
    {children}
    {disabled && ' (disabled)'}
  </button>
);
