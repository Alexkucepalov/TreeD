import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/hooks';
import { logoutUserGet } from '@features/auth/api/authActions';
import styles from './UserMenu.module.scss';
import chevronDownIcon from '@app/assets/icon/chevron-down.svg';
import checkIcon from '@app/assets/icon/check.svg';
import avatarImage from '@app/assets/icon/avatar.svg';

interface Account {
  id: string;
  name: string;
  status: string;
  avatar?: string;
  initial?: string;
  isOnline?: boolean;
}

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLImageElement>;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose, anchorRef }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAccountsExpanded, setIsAccountsExpanded] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState('account1');

  const accounts: Account[] = [
    {
      id: 'account1',
      name: 'Строитель Оффлайн',
      status: 'free',
      avatar: avatarImage,
      isOnline: true,
    },
    {
      id: 'account2',
      name: 'Строитель Оффлайн',
      status: 'free',
      initial: 'F',
      isOnline: false,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      if (menuRef.current) {
        menuRef.current.style.top = `${rect.bottom + 10}px`;
        menuRef.current.style.right = `${window.innerWidth - rect.right}px`;
      }
    }
  }, [isOpen, anchorRef]);

  const handleLogout = () => {
    dispatch(logoutUserGet());
    navigate('/');
    onClose();
  };

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId);
    // Здесь можно добавить логику переключения аккаунта
  };

  if (!isOpen) return null;

  return (
    <div className={styles.menuOverlay} onClick={onClose}>
      <div className={styles.menu} ref={menuRef} onClick={(e) => e.stopPropagation()}>
        {/* Фиолетовый прямоугольник для активного аккаунта - показываем только при раскрытом списке */}
        {isAccountsExpanded && (
          <div className={styles.activeAccountBackground}></div>
        )}
        
        {/* Фиолетовый индикатор роли в правом верхнем углу */}
        <div className={styles.roleIndicator}>
          <div className={styles.roleText}>Заказчик</div>
        </div>

        {/* Пункты меню */}
        <div className={styles.menuItem} onClick={() => { navigate('/profile'); onClose(); }}>
          Профиль
        </div>

        {/* Переключить аккаунт */}
        <div className={styles.menuItem} onClick={() => setIsAccountsExpanded(!isAccountsExpanded)}>
          Переключить аккаунт
          <img 
            src={chevronDownIcon} 
            alt="Expand" 
            className={`${styles.chevronDown} ${isAccountsExpanded ? styles.chevronDownRotated : ''}`}
          />
        </div>

        {/* Список аккаунтов */}
        {isAccountsExpanded && (
          <div className={styles.accountsList}>
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`${styles.accountItem} ${selectedAccountId === account.id ? styles.accountItemActive : ''}`}
                onClick={() => handleAccountSelect(account.id)}
              >
                <div className={styles.avatarContainer}>
                  {account.avatar ? (
                    <img src={account.avatar} alt={account.name} className={styles.avatarImage} />
                  ) : (
                    <div className={styles.avatarInitial}>{account.initial}</div>
                  )}
                  {account.isOnline && <div className={styles.onlineIndicator}></div>}
                </div>
                <div className={styles.accountInfo}>
                  <div className={styles.accountName}>{account.name}</div>
                  <div className={styles.accountStatus}>{account.status}</div>
                </div>
                {selectedAccountId === account.id && (
                  <img src={checkIcon} alt="Selected" className={styles.checkIcon} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Разделитель */}
        <div className={styles.divider}></div>

        <div className={styles.menuItem} onClick={() => { navigate('/portfolio'); onClose(); }}>
          Портфолио
        </div>

        {/* Разделитель */}
        <div className={styles.divider2}></div>

        <div className={styles.menuItem} onClick={() => { navigate('/settings'); onClose(); }}>
          Настройки
        </div>

        <div className={styles.menuItem} onClick={() => { navigate('/support'); onClose(); }}>
          Поддержка
        </div>

        <div className={styles.menuItem} onClick={() => { navigate('/subscription'); onClose(); }}>
          Подписка
        </div>

        <div className={styles.menuItem} onClick={() => { navigate('/payment'); onClose(); }}>
          Оплата
        </div>

        {/* Разделитель */}
        <div className={styles.divider3}></div>

        <div className={styles.menuItem} onClick={handleLogout}>
          Выйти
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

