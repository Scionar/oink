import { Component, ComponentType, ReactElement, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './StandaloneLink.module.css';
import { IconArrowLeft } from '../../icons/IconArrowLeft';

type StandaloneLinkProps = {
  children: string;
  variant?: 'back';
};

export const StandaloneLink = ({ children, variant }: StandaloneLinkProps) => (
  <span className={styles.standaloneLink}>
    {variant === 'back' && <IconArrowLeft size={18} />}

    <span
      className={clsx({
        [styles.leftMargin]: variant === 'back',
      })}
    >
      {children}
    </span>
  </span>
);
