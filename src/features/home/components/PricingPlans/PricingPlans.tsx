import React, { useState } from 'react';
import styles from './PricingPlans.module.scss';
import dinoSvg from '@app/assets/dino.svg';
import rocketSvg from '@app/assets/rocket.svg';
import starD9D9D9 from '@app/assets/starD9D9D9.svg';
import starFFFFFF from '@app/assets/starFFFFFF.svg';
import star754FFF from '@app/assets/star754FFF.svg';

const PricingPlans: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'master'>('customer');

  return (
    <section className={styles.section} id="pricing">
      <h2 className={styles.title}>Тарифы</h2>
      <p className={styles.description}>
        Простое и прозрачное ценообразование
        <br />
        Выберите план, который лучше всего соответствует вашим потребностям в 3D-печати
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

      {/* Basic Card */}
      <div className={`${styles.card} ${styles.cardBasic}`}>
        <div className={`${styles.cardBackground} ${styles.cardBackgroundWhite}`}></div>
        <h3 className={styles.cardTitle}>Basic</h3>
        <div className={`${styles.cardPrice} ${styles.cardPriceFree}`}>Бесплатно</div>
        <p className={styles.cardSubtitle}>
          {selectedRole === 'customer' 
            ? 'Подходит для выполнения нерегулярных задач'
            : 'Подходит для начинающих исполнителей'}
        </p>
        <ul className={styles.cardFeatures}>
          {selectedRole === 'customer' ? (
            <>
              <li className={styles.featureItem}>
                <img src={starD9D9D9} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>До 3-х активных заказов</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starD9D9D9} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Поддержка 24/7</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starD9D9D9} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Скидка 5% на первый заказ</span>
              </li>
            </>
          ) : (
            <>
              <li className={styles.featureItem}>
                <img src={starD9D9D9} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Комиссия 10%</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starD9D9D9} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Поддержка 24/7</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starD9D9D9} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Стандартный приоритет в поиске</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Pro/Maker Card */}
      <div className={`${styles.card} ${styles.cardPro}`}>
        <div className={`${styles.cardBackground} ${styles.cardBackgroundGradient}`}></div>
        <div className={styles.cardBadge}>Популярный</div>
        <h3 className={`${styles.cardTitle} ${styles.cardTitleWhite}`}>
          {selectedRole === 'customer' ? 'Pro' : 'Maker'}
        </h3>
        <p className={`${styles.cardSubtitle} ${styles.cardSubtitleWhite}`}>
          {selectedRole === 'customer' 
            ? (
              <>
                Для регулярных нужд
                <br />
                3D-печати
              </>
            )
            : 'Для опытных исполнителей'}
        </p>
        <div className={styles.cardPriceGroup}>
          <div className={`${styles.cardPriceAmount} ${styles.cardPriceAmountWhite}`}>290₽</div>
          <div className={`${styles.cardPricePeriod} ${styles.cardPricePeriodWhite}`}>в месяц</div>
        </div>
        <ul className={styles.cardFeatures}>
          {selectedRole === 'customer' ? (
            <>
              <li className={styles.featureItem}>
                <img src={starFFFFFF} alt="" className={styles.featureStar} />
                <span className={`${styles.featureText} ${styles.featureTextWhite}`}>До 10 активных заказов</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starFFFFFF} alt="" className={styles.featureStar} />
                <span className={`${styles.featureText} ${styles.featureTextWhite}`}>Поднятие заказа в топ на 72ч</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starFFFFFF} alt="" className={styles.featureStar} />
                <span className={`${styles.featureText} ${styles.featureTextWhite}`}>Функция «Предложение заказа»</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starFFFFFF} alt="" className={styles.featureStar} />
                <span className={`${styles.featureText} ${styles.featureTextWhite}`}>
                  Скидка 5% на обслуживание принтеров у нас
                </span>
              </li>
            </>
          ) : (
            <>
              <li className={styles.featureItem}>
                <img src={starFFFFFF} alt="" className={styles.featureStar} />
                <span className={`${styles.featureText} ${styles.featureTextWhite}`}>Комиссия 5%</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starFFFFFF} alt="" className={styles.featureStar} />
                <span className={`${styles.featureText} ${styles.featureTextWhite}`}>Приоритет в списке исполнителей</span>
              </li>
              <li className={styles.featureItem}>
                <img src={starFFFFFF} alt="" className={styles.featureStar} />
                <span className={`${styles.featureText} ${styles.featureTextWhite}`}>
                  Скидка 5% на обслуживание принтеров
                </span>
              </li>
              <li className={styles.featureItem}>
                <img src={starFFFFFF} alt="" className={styles.featureStar} />
                <span className={`${styles.featureText} ${styles.featureTextWhite}`}>Доступ к аналитике</span>
              </li>
            </>
          )}
        </ul>
        <button className={`${styles.cardButton} ${styles.cardButtonWhite}`} type="button">
          <span className={styles.cardButtonBg}></span>
          <span className={`${styles.cardButtonText} ${styles.cardButtonTextBlack}`}>Оформить</span>
        </button>
      </div>

      {/* Premium/Factory Card */}
      <div className={`${styles.card} ${styles.cardPremium}`}>
        <div className={`${styles.cardBackground} ${styles.cardBackgroundWhite}`}></div>
        <h3 className={styles.cardTitle}>
          {selectedRole === 'customer' ? 'Premium' : 'Factory'}
        </h3>
        <p className={styles.cardSubtitle}>
          {selectedRole === 'customer' 
            ? 'Для компаний и крупных заказчиков'
            : 'Для профессиональных мастерских'}
        </p>
        <div className={styles.cardPriceGroup}>
          <div className={`${styles.cardPriceAmount} ${styles.cardPriceAmountPurple}`}>990₽</div>
          <div className={`${styles.cardPricePeriod} ${styles.cardPricePeriodPurple}`}>в месяц</div>
        </div>
        <ul className={styles.cardFeatures}>
          {selectedRole === 'customer' ? (
            <>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Скидка 5% на все заказы</span>
              </li>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Неограниченное кол-во заказов</span>
              </li>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Личный менеджер</span>
              </li>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Шаблоны NDA</span>
              </li>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>
                  Скидка 15% на обслуживание принтеров у нас
                </span>
              </li>
            </>
          ) : (
            <>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Ранний доступ к крупным заказам</span>
              </li>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Максимальный приоритет в списке исполнителей</span>
              </li>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>
                  Скидка 15% на обслуживание принтеров
                </span>
              </li>
              <li className={styles.featureItem}>
                <img src={star754FFF} alt="" className={styles.featureStar} />
                <span className={styles.featureText}>Личный менеджер</span>
              </li>
            </>
          )}
        </ul>
        <button className={`${styles.cardButton} ${styles.cardButtonPurple}`} type="button">
          <span className={styles.cardButtonBg}></span>
          <span className={`${styles.cardButtonText} ${styles.cardButtonTextWhite}`}>Оформить</span>
        </button>
      </div>
      
      {/* Декоративный динозавр справа от блока с тарифами */}
      <img
        src={dinoSvg}
        alt=""
        aria-hidden
        className={`${styles.decoration} ${styles.decorationDino}`}
      />
      
      {/* Декоративная ракета слева от блока с тарифами */}
      <img
        src={rocketSvg}
        alt=""
        aria-hidden
        className={`${styles.decoration} ${styles.decorationRocket}`}
      />
    </section>
  );
};

export default PricingPlans;

