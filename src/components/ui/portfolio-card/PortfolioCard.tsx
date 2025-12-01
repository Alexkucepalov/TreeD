import React from 'react';
import styles from './PortfolioCard.module.scss';
import { cx } from '@utils/cx';
import fonImage from '../../../app/assets/fon.png';
import avatarImage from '../../../app/assets/avatar.png';
import starIcon from '../../../app/assets/star754FFF.svg';
import loveIcon from '../../../app/assets/love.svg';

export interface PortfolioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  avatarLetter?: string;
  name?: string;
  type?: string;
  title?: string;
  description?: string;
  rating?: number;
  ratingCount?: number;
  category?: string;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  image = fonImage,
  avatarLetter = 'F',
  name = 'Строитель Оффлайн',
  type = 'Студия',
  title = 'Working Trebuchet',
  description = 'Unleash medieval mayhem on the battlefield with this fully functional trebuchet — designed Unleash medieval mayhem on the battlefield with this fully functional trebuchet — designed',
  rating = 4.9,
  ratingCount = 13,
  category = 'прототип',
  onFavoriteClick,
  isFavorite = false,
  className,
  ...rest
}) => {
  const cardClasses = cx(styles.card, className);

  return (
    <div className={cardClasses} {...rest}>
      <div className={styles.frame69}>
        <img className={styles.image} src={image} alt={title} />
      </div>

      <div className={styles.frame62}>
        <div className={styles.frame64}>
          <div className={styles.avatar}>
            <div className={styles.avatarInner}>
              <div className={styles.avatarLetter}>{avatarLetter}</div>
            </div>
            <div className={styles.ellipse28}></div>
          </div>
          <div className={styles.frame63}>
            <div className={styles.name}>{name}</div>
            <div className={styles.type}>{type}</div>
          </div>
        </div>

        <div className={styles.frame67}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>

        <div className={styles.frame622}>
          <div className={styles.frame66}>
            <div className={styles.rating}>
              <img className={styles.star} src={starIcon} alt="star" />
              <div className={styles.ratingText}>
                <span className={styles.ratingValue}>{rating}</span>
                <span className={styles.ratingCount}>({ratingCount})</span>
              </div>
            </div>
          </div>
          <div className={styles.category}>{category}</div>
        </div>
      </div>

      <div className={styles.actions} onClick={onFavoriteClick}>
        <img className={styles.heart} src={loveIcon} alt="favorite" />
      </div>
    </div>
  );
};

