import React from 'react';
import styles from './Hero.module.scss';
import logoImg from '@app/assets/logo.png';
import hero from '@app/assets/hero.png';

const Hero: React.FC = () => {
  const [role, setRole] = React.useState<"customer" | "master">("customer");
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>
            От макета до 3D-модели
            <br />
            в пару кликов
          </h1>
          <p className={styles.subtitle}>
            Без лишних слов и трудностей
          </p>
          <div className={styles.buttons}>
            <button
              onClick={() => setRole("customer")}
              className={`${styles.button} ${styles.buttonPrimary} ${role === "customer" ? styles.active : ''}`}
              aria-pressed={role === "customer"}
            >
              Я заказчик
            </button>
            <button
              onClick={() => setRole("master")}
              className={`${styles.button} ${styles.buttonSecondary} ${role === "master" ? styles.active : ''}`}
              aria-pressed={role === "master"}
            >
              Я мастер
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;


