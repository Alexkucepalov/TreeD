import React from 'react';
import styles from './WorkshopMap.module.scss';
import mapImg from '@app/assets/maps.png';
import keySvg from '@app/assets/key.svg';

const WorkshopMap: React.FC = () => (
  <div id="workshop" className={styles.container}>
    <h2 className={styles.title}>Мастерская</h2>
    <p className={styles.description}>
      Профессиональный ремонт и обслуживание 3D-принтеров.
      <br />Вернём ваше оборудование к жизни быстро и с гарантией.
    </p>
    <div className={styles.mapContainer}>
      {/* Фото карты */}
      <div className={styles.mapImageContainer}>
        <img src={mapImg} alt="Карта мастерской" className={styles.mapImage} />
      </div>

      {/* Левый блок заголовка под фото */}
      <div className={styles.leftBlock}>
        <h3 className={styles.leftBlockTitle}>
          Возник вопрос?
          <br />Мы проконсультируем!
        </h3>
        <button className={styles.buttonPrimary}>
          Записаться
        </button>
      </div>

      {/* Правый информационный блок */}
      <div className={styles.rightBlock}>
        <p className={styles.address}>
          г Волгоград, пр-кт им. В.И. Ленина, д. 94, офис 241
        </p>
        <p className={styles.rightBlockText}>
          Ремонтируем и обслуживанем 3D-принтеры
          <br />Всегда поможем, поделимся опытом и дадим совет. Все в одном месте!
        </p>
        <button
          className={styles.buttonSecondary}
          onClick={() => window.open('https://yandex.ru/maps/?rtext=~Волгоград,+проспект имени В.И. Ленина,+94,+офис 241', '_blank')}
        >
          Построить маршрут
        </button>
      </div>
      
      {/* Декоративный ключ справа от блока мастерской */}
      <img
        src={keySvg}
        alt=""
        aria-hidden
        className={styles.decorativeKey}
      />
    </div>
  </div>
);

export default WorkshopMap;


