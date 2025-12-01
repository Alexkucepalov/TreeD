import React from 'react';
import styles from './Description3DPrint.module.scss';
import shipSvg from '@app/assets/ship.svg';

const Description3DPrint: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      {/* Левая часть - только кораблик */}
      <div className={styles.imageContainer}>
        <img
          src={shipSvg}
          alt="3D корабль"
          className={styles.image}
        />
      </div>

      {/* Правая часть - текст */}
      <div className={styles.textContainer}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            <span className={styles.titleAccent}>3D-печать</span>
          </h2>
          <h2 className={styles.titleSecondary}>
            — это когда по цифровой
            <br />
            модели слой за слоем
            <br />
            создают реальные вещи
          </h2>
        </div>
        <p className={styles.description}>
          Так можно быстро делать прототипы, индивидуальные имплантаты, модели зданий, восстанавливать сломанные детали, а ещё создавать уникальные предметы интерьера, игрушки, аксессуары и кастомные запчасти.
        </p>
        <a href="#learn-more" className={styles.link}>
          Узнать подробнее
        </a>
      </div>
    </div>
  </div>
);

export default Description3DPrint;


