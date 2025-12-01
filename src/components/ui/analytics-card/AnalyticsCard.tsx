import React from 'react';
import styles from './AnalyticsCard.module.scss';
import { cx } from '@utils/cx';

export type AnalyticsCardVariant = 'variant1' | 'variant2' | 'variant3' | 'variant4';

export interface AnalyticsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AnalyticsCardVariant;
  title?: string;
  subtitle?: string;
  value?: string;
  period?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  variant = 'variant1',
  title = 'Выручкаааамммммммм',
  subtitle = 'за 30 дней',
  value = '16 054₽',
  period,
  className,
  ...rest
}) => {
  const cardClasses = cx(styles.card, styles[`card--${variant}`], className);

  const renderContent = () => {
    if (variant === 'variant1') {
      return (
        <div className={styles.frame70}>
          <div className={styles.frame59}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          <div className={styles.value}>{value}</div>
        </div>
      );
    }

    if (variant === 'variant2') {
      return (
        <div className={styles.frame71}>
          <div className={styles.frame59}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          <div className={styles.value}>{value}</div>
        </div>
      );
    }

    if (variant === 'variant3') {
      return (
        <>
          <div className={styles.frame59}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          <div className={styles.value}>{value}</div>
        </>
      );
    }

    if (variant === 'variant4') {
      return (
        <div className={styles.frame73}>
          <div className={styles.frame59}>
            <div className={styles.frame592}>
              <div className={styles.title}>{title}</div>
              <div className={styles.subtitle}>{subtitle}</div>
            </div>
          </div>
          <div className={styles.period}>{period || '7 ДНЕЙ'}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cardClasses} {...rest}>
      {renderContent()}
    </div>
  );
};



