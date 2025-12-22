import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.scss';
import { UserMenu } from '../UserMenu';
import logo from '@app/assets/logo.svg';
import mailIcon from '@app/assets/icon/mail.svg';
import bellIcon from '@app/assets/icon/bell.svg';
import avatarIcon from '@app/assets/icon/avatar.svg';

const ProfileHeader: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleFindOrder = () => {
    navigate('/briefs');
  };

  const handleCreateOrder = () => {
    navigate('/create-order');
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <img className={styles.logo} src={logo} alt="TreeD logo" />
        <div className={styles.headerActions}>
          <div className={styles.roleSwitcherContainer}>
            <div className={styles.roleSwitcher}>
              <div className={styles.roleIndicator}></div>
              <div className={styles.roleText}>Заказчик</div>
            </div>
            <div className={styles.button} onClick={handleCreateOrder}>
              <div className={styles.findOrderButtonText}>Создать заказ</div>
            </div>
            <div className={styles.button} onClick={handleFindOrder}>
              <div className={styles.findOrderButtonText}>Найти заказ</div>
            </div>
          </div>
          <div className={styles.headerIcons}>
            <img className={styles.mail} src={mailIcon} alt="Mail" />
            <img className={styles.bell} src={bellIcon} alt="Notifications" />
            <img 
              ref={avatarRef}
              className={styles.avatar} 
              src={avatarIcon} 
              alt="Avatar" 
              onClick={handleAvatarClick}
            />
          </div>
        </div>
      </div>
      <UserMenu 
        isOpen={isUserMenuOpen} 
        onClose={handleCloseMenu}
        anchorRef={avatarRef}
      />
    </>
  );
};

export default ProfileHeader;

