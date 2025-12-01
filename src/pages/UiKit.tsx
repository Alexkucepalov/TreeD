import React, { useState } from 'react';
import styles from './ui-kit.module.scss';
import { Button, Chips, Status, PortfolioCard, AnalyticsCard, Switch } from '@components/ui';

const UiKit: React.FC = () => {
  const [switchPosition, setSwitchPosition] = useState<'left' | 'right'>('left');

  const buttonVariants = [
    { label: 'Primary', props: { variant: 'primary' as const } },
    { label: 'Ghost', props: { variant: 'ghost' as const } },
    { label: 'Secondary', props: { variant: 'secondary' as const } },
    { label: 'Disabled', props: { variant: 'ghost' as const, disabled: true } },
  ];

  const chipsColors = [
    'purple',
    'blue',
    'yellow',
    'green',
    'light-yellow',
    'peach',
    'gray',
  ] as const;

  const statusVariants = [
    { label: 'Free', variant: 'free' as const },
    { label: 'Maker', variant: 'maker' as const },
    { label: 'Factory', variant: 'factory' as const },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>UI Kit</h1>
        <p className={styles.subtitle}>Демонстрационная страница переиспользуемых компонентов</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buttons</h2>
        <div className={styles.componentGroup}>
          {buttonVariants.map(({ label, props }) => (
            <article key={label} className={styles.card}>
              <h3 className={styles.cardTitle}>{label}</h3>
              <Button {...props}>кнопка</Button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Chips - Large (85x24)</h2>
        <div className={styles.componentGroup}>
          {chipsColors.map((color) => (
            <article key={`chips-${color}-large`} className={styles.card}>
              <h3 className={styles.cardTitle}>{color}</h3>
              <Chips color={color} size="large">chips</Chips>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Chips - Small (58x16)</h2>
        <div className={styles.componentGroup}>
          {chipsColors.map((color) => (
            <article key={`chips-${color}-small`} className={styles.card}>
              <h3 className={styles.cardTitle}>{color}</h3>
              <Chips color={color} size="small">chips</Chips>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Statuses</h2>
        <div className={styles.componentGroup}>
          {statusVariants.map(({ label, variant }) => (
            <article key={variant} className={styles.card}>
              <h3 className={styles.cardTitle}>{label}</h3>
              <Status variant={variant}>{label}</Status>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Portfolio Card</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <PortfolioCard />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Analytics Cards</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <AnalyticsCard variant="variant1" />
          <AnalyticsCard variant="variant2" />
          <AnalyticsCard variant="variant3" />
          <AnalyticsCard variant="variant4" period="7 ДНЕЙ" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Switch</h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 className={styles.cardTitle}>Interactive</h3>
            <Switch 
              position={switchPosition} 
              onChange={setSwitchPosition}
            />
            <p style={{ fontSize: '14px', color: '#727986', margin: 0 }}>
              Current: {switchPosition === 'left' ? 'Исполнитель' : 'Заказчик'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 className={styles.cardTitle}>Left Position</h3>
            <Switch position="left" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 className={styles.cardTitle}>Right Position</h3>
            <Switch position="right" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UiKit;
