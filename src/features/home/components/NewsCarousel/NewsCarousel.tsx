import React, { useState, useEffect } from 'react';
import styles from './NewsCarousel.module.scss';
import news1 from '@app/assets/news1.jpg';
import news2 from '@app/assets/news2.jpg';
import news3 from '@app/assets/news3.png';
import news4 from '@app/assets/news4.jpg';

const mockNews = [
  {
    id: 1,
    title: '3D-печать лица: новые возможности персонализации',
    excerpt: 'Современные 3D-принтеры позволяют создавать точные копии человеческих лиц и сложные макеты для медицины, кино и образования.',
    image: news1,
    category: 'Технологии',
  },
  {
    id: 2,
    title: 'Пластик для 3D-печати: выбор материала для задач',
    excerpt: 'PLA, ABS, PETG и другие виды пластика открывают широкие возможности для создания прототипов, игрушек и функциональных деталей.',
    image: news2,
    category: 'Материалы',
  },
  {
    id: 3,
    title: 'Фотополимерная смола: точность и детализация',
    excerpt: 'SLA/DLP/LCD-принтеры используют фотополимерную смолу для создания сверхдетализированных и гладких моделей.',
    image: news3,
    category: 'Фотополимеры',
  },
  {
    id: 4,
    title: '3D-прототипирование: от идеи к реальному объекту',
    excerpt: '3D-принтеры и современное ПО позволяют быстро воплощать идеи в физические объекты для бизнеса, науки и творчества.',
    image: news4,
    category: 'Прототипирование',
  },
];

const NewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, mockNews.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const visibleNews = mockNews.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div id="news" className={styles.container}>
      <div className={styles.content}>
        {/* Заголовок секции */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Свежие новости
          </h2>
          <p className={styles.subtitle}>
            Будьте в курсе последних событий в мире 3D-печати и технологий
          </p>
        </div>

        {/* Карусель */}
        <div className={styles.carousel}>
          {/* Кнопки навигации */}
          <button
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            aria-label="Предыдущий слайд"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.navButtonRight}`}
            aria-label="Следующий слайд"
          >
            ›
          </button>

          {/* Контейнер для карточек */}
          <div className={styles.cardsContainer}>
            {visibleNews.map((news) => (
              <div key={news.id} className={styles.card}>
                {/* Изображение */}
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${news.image})` }}
                >
                  {/* Категория */}
                  <span className={styles.cardCategory}>
                    {news.category}
                  </span>
                </div>

                <div className={styles.cardContent}>
                  {/* Заголовок */}
                  <h3 className={styles.cardTitle}>
                    {news.title}
                  </h3>

                  {/* Описание */}
                  <p className={styles.cardExcerpt}>
                    {news.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Индикаторы */}
          <div className={styles.indicators}>
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Кнопка "Все новости" */}
        <div className={styles.footer}>
          <a
            href="https://dzen.ru/treed"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.allNewsButton}
          >
            Все новости
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;


