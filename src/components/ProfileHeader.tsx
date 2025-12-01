import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileHeader.module.scss';
import logo from '../app/assets/logo.svg';
import mailIcon from '../app/assets/icon/mail.svg';
import bellIcon from '../app/assets/icon/bell.svg';
import avatarIcon from '../app/assets/icon/avatar.svg';

const ProfileHeader: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <img className={styles.logo} src={logo} alt="TreeD logo" />
      <div className={styles.navigationLinks}>
        <Link to="/#workshop" className={styles.navLink}>Мастерская</Link>
        <Link to="/#pricing" className={styles.navLink}>Тарифы</Link>
        <Link to="/#news" className={styles.navLink}>Новости</Link>
      </div>
      <div className={styles.headerActions}>
        <div className={styles.roleSwitcherContainer}>
          <div className={styles.roleSwitcher}>
            <div className={styles.roleIndicator}></div>
            <div className={styles.roleText}>Заказчик</div>
          </div>
          <div className={styles.button}>
            <div className={styles.findOrderButtonText}>Найти заказ</div>
          </div>
        </div>
        <div className={styles.headerIcons}>
          <img className={styles.mail} src={mailIcon} alt="Mail" />
          <img className={styles.bell} src={bellIcon} alt="Notifications" />
          <img className={styles.avatar} src={avatarIcon} alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;




