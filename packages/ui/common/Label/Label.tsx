import * as React from 'react';
import { clsx } from 'clsx';
import styles from './Label.module.css';

type LabelProps = {
  children: string;
  required?: boolean;
};

export const Label = ({ children, required = false }: LabelProps) => (
  <label
    className={clsx({ [styles.label]: true, [styles.required]: required })}
  >
    {children}
  </label>
);
