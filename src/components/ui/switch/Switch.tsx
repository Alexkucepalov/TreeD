import React from 'react';
import styles from './Switch.module.scss';
import { cx } from '@utils/cx';

export type SwitchPosition = 'left' | 'right';

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  position?: SwitchPosition;
  leftLabel?: string;
  rightLabel?: string;
  onChange?: (position: SwitchPosition) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  position = 'left',
  leftLabel = 'Исполнитель',
  rightLabel = 'Заказчик',
  onChange,
  className,
  onClick,
  ...rest
}) => {
  const switchClasses = cx(
    styles.switch,
    position === 'left' ? styles['switch--left'] : styles['switch--right'],
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newPosition: SwitchPosition = position === 'left' ? 'right' : 'left';
    onChange?.(newPosition);
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const newPosition: SwitchPosition = position === 'left' ? 'right' : 'left';
      onChange?.(newPosition);
    }
  };

  const currentLabel = position === 'left' ? leftLabel : rightLabel;

  return (
    <div 
      className={switchClasses} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button" 
      tabIndex={0}
      aria-label={`Switch to ${position === 'left' ? rightLabel : leftLabel}`}
      {...rest}
    >
      <div className={styles.ellipse}></div>
      <div className={styles.text}>{currentLabel}</div>
    </div>
  );
};

