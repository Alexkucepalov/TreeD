import React from 'react';
import styles from './Button.module.scss';
import { cx } from '@utils/cx';

export type ButtonProps = React.HTMLAttributes<HTMLDivElement> & { 
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  block?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  block = false, 
  disabled = false,
  className, 
  children,
  onClick,
  onKeyDown,
  ...rest 
}) => {
  const buttonClasses = cx(
    styles.button,
    styles[`button--${variant}`],
    block && styles['button--block'],
    disabled && styles['button--disabled'],
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
    }

    onKeyDown?.(event);
  };

  return (
    <div 
      className={buttonClasses} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...rest}
    >
      <div className={styles.div}>{children}</div>
    </div>
  );
};
