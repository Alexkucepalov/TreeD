import React, { useState } from 'react';
import './PricingPlans.css';
import dinoSvg from '../app/assets/dino.svg';
import rocketSvg from '../app/assets/rocket.svg';
import starD9D9D9 from '../app/assets/starD9D9D9.svg';
import starFFFFFF from '../app/assets/starFFFFFF.svg';
import star754FFF from '../app/assets/star754FFF.svg';

const PricingPlans: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'master'>('customer');

  return (
    <section className="pricing-section" id="pricing">
      <h2 className="pricing-title">Тарифы</h2>
      <p className="pricing-description">
        Простое и прозрачное ценообразование
        <br />
        Выберите план, который лучше всего соответствует вашим потребностям в 3D-печати
      </p>

      {/* Кнопки выбора роли */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '180px',
        zIndex: 10,
      }}>
        <div style={{
          width: '464px',
          height: '45px',
          backgroundColor: '#fff',
          borderRadius: '44.835px',
          display: 'flex',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}>
          {/* Левая кнопка - Заказчик */}
          <div
            onClick={() => setSelectedRole('customer')}
            style={{
              flex: 1,
              backgroundColor: selectedRole === 'customer' ? '#9163ff' : '#fff',
              color: selectedRole === 'customer' ? '#fff' : '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'all 0.3s',
              borderRadius: selectedRole === 'customer' ? '44.835px' : '44.835px 0 0 44.835px',
            }}
          >
            Заказчик
          </div>
          
          {/* Правая кнопка - Мастер */}
          <div
            onClick={() => setSelectedRole('master')}
            style={{
              flex: 1,
              backgroundColor: selectedRole === 'master' ? '#9163ff' : '#fff',
              color: selectedRole === 'master' ? '#fff' : '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'all 0.3s',
              borderRadius: selectedRole === 'master' ? '44.835px' : '0 44.835px 44.835px 0',
            }}
          >
            Мастер
          </div>
        </div>
      </div>

      {/* Basic Card */}
      <div className="pricing-card pricing-card--basic">
        <div className="card-background card-background--white"></div>
        <h3 className="card-title">Basic</h3>
        <div className="card-price card-price--free">Бесплатно</div>
        <p className="card-subtitle">
          {selectedRole === 'customer' 
            ? 'Подходит для выполнения нерегулярных задач'
            : 'Подходит для начинающих исполнителей'}
        </p>
        <ul className="card-features">
          {selectedRole === 'customer' ? (
            <>
              <li className="feature-item">
                <img src={starD9D9D9} alt="" className="feature-star" />
                <span className="feature-text">До 3-х активных заказов</span>
              </li>
              <li className="feature-item">
                <img src={starD9D9D9} alt="" className="feature-star" />
                <span className="feature-text">Поддержка 24/7</span>
              </li>
              <li className="feature-item">
                <img src={starD9D9D9} alt="" className="feature-star" />
                <span className="feature-text">Скидка 5% на первый заказ</span>
              </li>
            </>
          ) : (
            <>
              <li className="feature-item">
                <img src={starD9D9D9} alt="" className="feature-star" />
                <span className="feature-text">Комиссия 10%</span>
              </li>
              <li className="feature-item">
                <img src={starD9D9D9} alt="" className="feature-star" />
                <span className="feature-text">Поддержка 24/7</span>
              </li>
              <li className="feature-item">
                <img src={starD9D9D9} alt="" className="feature-star" />
                <span className="feature-text">Стандартный приоритет в поиске</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Pro/Maker Card */}
      <div className="pricing-card pricing-card--pro">
        <div className="card-background card-background--gradient"></div>
        <div className="card-badge">Популярный</div>
        <h3 className="card-title card-title--white">
          {selectedRole === 'customer' ? 'Pro' : 'Maker'}
        </h3>
        <p className="card-subtitle card-subtitle--white">
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
        <div className="card-price-group">
          <div className="card-price-amount card-price-amount--white">290₽</div>
          <div className="card-price-period card-price-period--white">в месяц</div>
        </div>
        <ul className="card-features">
          {selectedRole === 'customer' ? (
            <>
              <li className="feature-item">
                <img src={starFFFFFF} alt="" className="feature-star" />
                <span className="feature-text feature-text--white">До 10 активных заказов</span>
              </li>
              <li className="feature-item">
                <img src={starFFFFFF} alt="" className="feature-star" />
                <span className="feature-text feature-text--white">Поднятие заказа в топ на 72ч</span>
              </li>
              <li className="feature-item">
                <img src={starFFFFFF} alt="" className="feature-star" />
                <span className="feature-text feature-text--white">Функция «Предложение заказа»</span>
              </li>
              <li className="feature-item">
                <img src={starFFFFFF} alt="" className="feature-star" />
                <span className="feature-text feature-text--white">
                  Скидка 5% на обслуживание принтеров у нас
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="feature-item">
                <img src={starFFFFFF} alt="" className="feature-star" />
                <span className="feature-text feature-text--white">Комиссия 5%</span>
              </li>
              <li className="feature-item">
                <img src={starFFFFFF} alt="" className="feature-star" />
                <span className="feature-text feature-text--white">Приоритет в списке исполнителей</span>
              </li>
              <li className="feature-item">
                <img src={starFFFFFF} alt="" className="feature-star" />
                <span className="feature-text feature-text--white">
                  Скидка 5% на обслуживание принтеров
                </span>
              </li>
              <li className="feature-item">
                <img src={starFFFFFF} alt="" className="feature-star" />
                <span className="feature-text feature-text--white">Доступ к аналитике</span>
              </li>
            </>
          )}
        </ul>
        <button className="card-button card-button--white" type="button">
          <span className="card-button-bg"></span>
          <span className="card-button-text card-button-text--black">Оформить</span>
        </button>
      </div>

      {/* Premium/Factory Card */}
      <div className="pricing-card pricing-card--premium">
        <div className="card-background card-background--white"></div>
        <h3 className="card-title">
          {selectedRole === 'customer' ? 'Premium' : 'Factory'}
        </h3>
        <p className="card-subtitle">
          {selectedRole === 'customer' 
            ? 'Для компаний и крупных заказчиков'
            : 'Для профессиональных мастерских'}
        </p>
        <div className="card-price-group">
          <div className="card-price-amount card-price-amount--purple">990₽</div>
          <div className="card-price-period card-price-period--purple">в месяц</div>
        </div>
        <ul className="card-features">
          {selectedRole === 'customer' ? (
            <>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">Скидка 5% на все заказы</span>
              </li>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">Неограниченное кол-во заказов</span>
              </li>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">Личный менеджер</span>
              </li>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">Шаблоны NDA</span>
              </li>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">
                  Скидка 15% на обслуживание принтеров у нас
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">Ранний доступ к крупным заказам</span>
              </li>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">Максимальный приоритет в списке исполнителей</span>
              </li>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">
                  Скидка 15% на обслуживание принтеров
                </span>
              </li>
              <li className="feature-item">
                <img src={star754FFF} alt="" className="feature-star" />
                <span className="feature-text">Личный менеджер</span>
              </li>
            </>
          )}
        </ul>
        <button className="card-button card-button--purple" type="button">
          <span className="card-button-bg"></span>
          <span className="card-button-text card-button-text--white">Оформить</span>
        </button>
      </div>
      
      {/* Декоративный динозавр справа от блока с тарифами */}
      <img
        src={dinoSvg}
        alt=""
        aria-hidden
        className="pricing-decoration pricing-decoration--dino"
      />
      
      {/* Декоративная ракета слева от блока с тарифами */}
      <img
        src={rocketSvg}
        alt=""
        aria-hidden
        className="pricing-decoration pricing-decoration--rocket"
      />
    </section>
  );
};

export default PricingPlans;
