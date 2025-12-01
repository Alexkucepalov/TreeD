import React from 'react';
import styles from './Chips.module.scss';
import { cx } from '@utils/cx';

export type ChipsProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: 'purple' | 'blue' | 'yellow' | 'green' | 'light-yellow' | 'peach' | 'gray';
  size?: 'large' | 'small';
};

export const Chips: React.FC<ChipsProps> = ({
  color = 'purple',
  size = 'large',
  className,
  children,
  ...rest
}) => {
  const chipsClasses = cx(
    styles.chips,
    styles[`chips--${color}`],
    styles[`chips--${size}`],
    className
  );

  return (
    <div className={chipsClasses} {...rest}>
      <div className={styles.chipsText}>{children}</div>
    </div>
  );
};



