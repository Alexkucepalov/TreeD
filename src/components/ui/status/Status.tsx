import React from 'react';
import styles from './Status.module.scss';
import { cx } from '@utils/cx';

export type StatusVariant = 'free' | 'maker' | 'factory';

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: StatusVariant;
}

export const Status: React.FC<StatusProps> = ({ variant = 'free', className, children, ...rest }) => {
  const statusClasses = cx(styles.status, styles[`status--${variant}`], className);

  return (
    <div className={statusClasses} {...rest}>
      <div className={styles.statusText}>{children ?? variant}</div>
    </div>
  );
};


