import React, { useMemo, useState } from 'react';
import styles from './BestPerformers.module.scss';
import downArrow from '@app/assets/downarrow.svg';

type Performer = {
  type: 'Прототип' | 'Макет' | 'Детали';
  title: string;
  author: string;
  rating: number;
  image: any;
  description: string;
};

const performers: Performer[] = [
  {
    type: 'Макет',
    title: 'Working Trebuchet',
    author: 'Brr Brr Patapim',
    rating: 4.9,
    image: require('@app/assets/executor1.png'),
    description: 'Рабочий макет требушета — функциональная модель для запуска небольших снарядов.',
  },
  {
    type: 'Макет',
    title: 'Mini Vader Figurine',
    author: 'Denchik Slazit',
    rating: 5.0,
    image: require('@app/assets/executor2.png'),
    description: 'Миниатюрная фигурка Вейдера — идеальный сувенир для фанатов, выполненный с высокой детализацией.',
  },
  {
    type: 'Детали',
    title: 'Screw Claw',
    author: 'Drizlo Baam',
    rating: 4.7,
    image: require('@app/assets/executor3.png'),
    description: 'Screw Claw — насадка для удобного удержания шурупов перед закручиванием. Упрощает работу одной рукой.',
  },
];

const BestPerformers: React.FC = () => {
  const [filter, setFilter] = useState<'Все услуги' | 'Прототипы' | 'Макеты' | 'Детали'>('Все услуги');

  const filtered = useMemo(() => {
    switch (filter) {
      case 'Прототипы':
        return performers.filter((p) => p.type === 'Прототип');
      case 'Макеты':
        return performers.filter((p) => p.type === 'Макет');
      case 'Детали':
        return performers.filter((p) => p.type === 'Детали');
      default:
        return performers.slice(0, 3);
    }
  }, [filter]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Лучшие исполнители
      </h2>
      <p className={styles.description}>
        Изучите портфолио исполнителей, их опыт
        <br />
        и отзывы, чтобы выбрать наиболее подходящего для вашего проекта.
      </p>
      
      {/* Переключатель категорий */}
      <div className={styles.filterContainer}>
        <div className={styles.filterButtons}>
          {(['Все услуги', 'Прототипы', 'Макеты', 'Детали'] as const).map((label, idx) => {
            const active = filter === label;
            const isFirst = idx === 0;
            const isLast = idx === 3;
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`${styles.filterButton} ${active ? styles.filterButtonActive : ''} ${isFirst ? styles.filterButtonFirst : ''} ${isLast ? styles.filterButtonLast : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map((p, idx) => (
          <div key={idx} className={styles.card}>
            <img
              src={p.image}
              alt={p.title}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <span className={styles.cardType}>{p.type}</span>
                <div className={styles.cardRating}>
                  <span className={styles.ratingValue}>{p.rating.toFixed(1)}</span>
                  <span className={styles.ratingStar}>★</span>
                </div>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardAuthor}>{p.author}</p>
              <p className={styles.cardDescription}>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Сноска Другие проекты */}
      <div className={styles.footer}>
        <img src={downArrow} alt="Другие проекты" className={styles.footerIcon} />
        <span className={styles.footerText}>
          Другие проекты
        </span>
      </div>
    </div>
  );
};

export default BestPerformers;


