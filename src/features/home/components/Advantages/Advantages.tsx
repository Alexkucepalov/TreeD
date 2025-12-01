import React from 'react';
import styles from './Advantages.module.scss';
import heartImg from '@app/assets/heart.svg';
import moneyImg from '@app/assets/money_brick.svg';
import speechImg from '@app/assets/speech_bubble_dots.svg';

const Advantages: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Заголовок и описание */}
        <div className={styles.header}>
          {/* Левая часть - заголовок */}
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>
              Мы гарантируем
              <br />
              безопасность
              <br />
              на всех этапах!
            </h2>
          </div>
          
          {/* Правая часть - описание */}
          <div className={styles.headerRight}>
            <p className={styles.description}>
              Наша платформа предоставляет все необходимое для воплощения ваших проектов в жизнь с легкостью и уверенностью.
            </p>
          </div>
        </div>

        {/* Три колонки с преимуществами */}
        <div className={styles.columns}>
          {/* Колонка 1 - Проверенные исполнители */}
          <div className={styles.column}>
            <img
              src={heartImg}
              alt="Проверенные исполнители"
              className={styles.icon}
            />
            <h3 className={styles.columnTitle}>
              Проверенные
              <br />
              исполнители
            </h3>
            <div className={styles.columnContent}>
              <p className={styles.columnText}>
                Обращайтесь к опытным подрядчикам, которые смогут выполнить ваши проекты в срок и с высоким качеством.
              </p>
            </div>
          </div>

          {/* Колонка 2 - Безопасная оплата */}
          <div className={styles.column}>
            <img
              src={moneyImg}
              alt="Безопасная оплата"
              className={styles.icon}
            />
            <h3 className={styles.columnTitle}>
              Безопасная оплата
            </h3>
            <div className={styles.columnContent}>
              <p className={styles.columnText}>
                Деньги хранятся на специальном счёте и передаются только после того, как клиент подтвердит выполнение работы.
              </p>
            </div>
          </div>

          {/* Колонка 3 - Чат с исполнителем */}
          <div className={styles.column}>
            <img
              src={speechImg}
              alt="Чат с исполнителем"
              className={styles.icon}
            />
            <h3 className={styles.columnTitle}>
              Чат с исполнителем
            </h3>
            <div className={styles.columnContent}>
              <p className={styles.columnText}>
                Общайтесь напрямую с исполнителями, делитесь файлами и обсуждайте детали проекта.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;


