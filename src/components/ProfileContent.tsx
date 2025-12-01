import React from 'react';
import styles from './ProfileContent.module.scss';
import starIcon from '../app/assets/star754FFF.svg';

interface ProfileContentProps {
  userName?: string;
  userRole?: string;
  userCity?: string;
  rating?: number;
  ratingCount?: number;
  technologies?: string[];
  description?: string;
  revenue?: number;
  ordersCount?: number;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  userName = 'User Name',
  userRole = 'Maker',
  userCity = 'Москва',
  rating = 4.9,
  ratingCount = 13,
  technologies = ['FDM', 'SLA', 'PETG', 'TPU'],
  description = 'Печатаю ABS/PETG, опыт 5 лет. Краткая самопрезентация: имя/ник, фото, рейтинг, регион, выбранные теги. Краткая самопрезентация: имя/ник, фото, рейтинг, регион, выбранные теги.',
  revenue = 16054,
  ordersCount = 1
}) => {
  // Получаем первую букву имени для аватара
  const getInitial = () => {
    if (userName && userName !== 'User Name') {
      return userName.charAt(0).toUpperCase();
    }
    return 'F';
  };
  return (
    <div className={styles.profileContentContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileCardContent}>
          <div className={styles.userInfoRow}>
            <div className={styles.avatar}>
              <div className={styles.avatarBackground}>
                <div className={styles.avatarInitial}>{getInitial()}</div>
              </div>
              <div className={styles.avatarBorder}></div>
              <div className={styles.avatarStatusIndicator}></div>
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{userName}</div>
              <div className={styles.userTags}>
                <div className={styles.status}>
                  <div className={styles.maker}>{userRole}</div>
                </div>
                <div className={styles.chips}>
                  <div className={styles.chips2}>{userCity}</div>
                </div>
              </div>
              <div className={styles.ratingContainer}>
                <img className={styles.star} src={starIcon} alt="Star" />
                <div className={styles.ratingText}>
                  <span>
                    <span className={styles.ratingValue}>{rating}</span>
                    <span className={styles.ratingCount}>({ratingCount})</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.technologiesSection}>
            <div className={styles.sectionTitle}>Технологии и материалы</div>
            <div className={styles.technologiesList}>
              {technologies.map((tech, index) => (
                <div key={index} className={styles.chips3}>
                  <div className={styles.chips4}>{tech}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.descriptionSection}>
            <div className={styles.sectionTitle}>Технологии и материалы</div>
            <div className={styles.descriptionText}>{description}</div>
          </div>
        </div>
      </div>
      <div className={styles.analyticsSection}>
        <div className={styles.analyticsSectionHeader}>
          <div className={styles.analyticsTitle}>Аналитика</div>
        </div>
        <div className={styles.analyticsCards}>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsCardContent}>
              <div className={styles.analyticsCardHeader}>
                <div className={styles.analyticsCardTitle}>Выручка</div>
                <div className={styles.analyticsCardSubtitle}>за 30 дней</div>
              </div>
              <div className={styles.numberValue}>{revenue.toLocaleString('ru-RU')}₽</div>
            </div>
          </div>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsCardContent}>
              <div className={styles.analyticsCardHeader}>
                <div className={styles.analyticsCardTitle}>
                  количество
                  <br />
                  заказов
                </div>
                <div className={styles.analyticsCardSubtitle}>за 30 дней</div>
              </div>
              <div className={styles.numberValue}>{ordersCount}</div>
            </div>
          </div>
          <div className={styles.subscriptionPromo}>
            <div className={styles.subscriptionPromoContent}>
              <div className={styles.subscriptionPromoText}>
                <div className={styles.promoTitle}>
                  Хотите лучше понимать
                  <br />
                  тенденции рынка?
                </div>
                <div className={styles.promoDescription}>
                  <span>
                    <span className={styles.promoDescriptionText}>
                      Более подробная аналитика в подписке
                    </span>
                    <span className={styles.promoDescriptionHighlight}>Maker!</span>
                  </span>
                </div>
              </div>
              <div className={styles.button}>
                <div className={styles.buttonText}>Оформить подписку</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;




