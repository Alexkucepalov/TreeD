import React, { useState } from 'react';
import styles from './HowItWorks.module.scss';
import step1Img from '@app/assets/1.png';
import step2Img from '@app/assets/2.png';
import step3Img from '@app/assets/3.png';
import arrowImg from '@app/assets/arrow.png';
import kitSvg from '@app/assets/kit.svg';

const HowItWorks: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'master'>('customer');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Декоративная картинка справа (кот) */}
        <img
          src={kitSvg}
          alt="Декоративный кот"
          aria-hidden
          className={styles.decorativeCat}
        />
        
        {/* Заголовок и описание */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Как мы работаем
          </h2>
          
          <p className={styles.description}>
            Все просто, мы поможем на каждом этапе!<br />В зависимости от роли в проекте алгоритм действий<br />для
            достижения результата отличается.
          </p>

          {/* Кнопки выбора роли */}
          <div className={styles.roleSwitcher}>
            <div className={styles.roleButtons}>
              {/* Левая кнопка - Заказчик */}
              <button
                onClick={() => setSelectedRole('customer')}
                className={`${styles.roleButton} ${selectedRole === 'customer' ? styles.roleButtonActive : styles.roleButtonLeft}`}
              >
                Заказчик
              </button>
              
              {/* Правая кнопка - Мастер */}
              <button
                onClick={() => setSelectedRole('master')}
                className={`${styles.roleButton} ${selectedRole === 'master' ? styles.roleButtonActive : styles.roleButtonRight}`}
              >
                Мастер
              </button>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className={styles.mainContent}>
          {/* Левая часть - фиолетовый блок */}
          <div className={styles.leftBlock}>
            <div className={styles.leftBlockContent}>
              <h3 className={styles.leftBlockTitle}>
                Воплотите идею<br />в жизнь легко
              </h3>
              
              <img
                src={arrowImg}
                alt="Иллюстрация"
                className={styles.leftBlockImage}
              />

              <p className={styles.leftBlockText}>
                Вы хотите получить качественную 3D-печать без лишних сложностей? Здесь вы можете быстро найти опытного
                исполнителя, который напечатает ваш проект по нужным параметрам и в срок.<br /><br />Просто загрузите
                файл, выберите подходящего мастера из предложенных и контролируйте процесс через удобный сервис.
              </p>

              <a href="#more" className={styles.leftBlockLink}>
                Читать подробнее
              </a>
            </div>
          </div>

          {/* Правая часть - шаги */}
          <div className={styles.stepsContainer}>
            {/* Шаг 1 */}
            <div className={styles.step}>
              <div className={styles.stepImageContainer}>
                <img
                  src={step1Img}
                  alt="Шаг 1"
                  className={styles.stepImage}
                />
              </div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>
                  {selectedRole === 'customer' ? 'Создание заказа' : 'Выбор заказа'}
                </h4>
                <p className={styles.stepText}>
                  {selectedRole === 'customer' 
                    ? 'С использованием специализированной формы вы сможете без затруднений оформить техническое задание на изготовление объекта'
                    : 'После заполнения портфолио, вы можете выбрать заказ, изготовление которого вам понравиться'}
                </p>
              </div>
            </div>

            {/* Шаг 2 */}
            <div className={styles.step}>
              <div className={styles.stepImageContainer}>
                <img
                  src={step2Img}
                  alt="Шаг 2"
                  className={styles.stepImage}
                />
              </div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>
                  {selectedRole === 'customer' ? 'Выбор исполнителя' : 'Предложение цены'}
                </h4>
                <p className={styles.stepText}>
                  {selectedRole === 'customer'
                    ? 'После публикации заказа к вам начнут обращаться исполнители. Вам останется только выбрать подходящий вариант по цене и срокам.'
                    : 'После выбранного заказа, согласуйте с заказчиком сроки и оплату, и приступайте к работе'}
                </p>
              </div>
            </div>

            {/* Шаг 3 */}
            <div className={styles.step}>
              <div className={styles.stepImageContainer}>
                <img
                  src={step3Img}
                  alt="Шаг 3"
                  className={styles.stepImage}
                />
              </div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>
                  {selectedRole === 'customer' ? 'Оплата и получение' : 'Передача заказа'}
                </h4>
                <p className={styles.stepText}>
                  {selectedRole === 'customer'
                    ? 'После подтверждения сделки обеими сторонами происходит оплата. Вы сами выбираете: забрать товар или заказать доставку.'
                    : 'После завершения сделки, происходит оплата, по согласованию с заказчиком принимается решение о доставке'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;


