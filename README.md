## TreeD

### Описание

Этот репозиторий — **фронтенд‑часть сайта TreeD** для 3D‑печатников.  

### Технологии

- **React 18**, **React Router**;
- **Redux Toolkit**, **React‑Redux**;
- **TypeScript**;
- **MUI (Material UI)** — UI‑компоненты (кнопки, фильтры, таблицы и т.д.);
- **Recharts** — графики и диаграммы;
- **Webpack 5** — сборка фронтенда;
- **ESLint**, **Prettier**, **Stylelint**, **Husky**.

---

## Структура проекта

- **`src/app`**
  - `App.tsx` — корневой компонент приложения;
  - `assets/` — иконки и изображения (в т.ч. ассеты для брифов и 3D‑печати).

- **`src/features`**
  - `home/` — главная маркетинговая страница;
  - `auth/` — авторизация, регистрация, восстановление/сброс пароля;
  - `profile/` — личный кабинет мейкера (хедер, меню, контент профиля);
  - `briefs/`
    - `pages/BriefsPage.tsx` — страница брифов (`/briefs`);
    - `components/Filters/` — фильтр по брифам (категория, тип печати, материалы, цена, дедлайн и др.);
    - `components/BriefsList/` — список карточек брифов и сортировки.

- **`src/shared/components`**
  - `Analytics/` — блок аналитики мейкера (графики, карточки показателей);
  - `Orders/` — список и детали заказов;
  - `ProtectedRoute/` — защита приватных роутов (например, `/profile`, `/briefs`).

- **`src/components`**
  - общие компоненты приложения (хедер, футер, лендинг, модалки, UI‑элементы и т.п.).

- **Стор и утилиты**
  - `src/store/`, `src/services/` — конфигурация Redux store, экшены и редьюсеры;
  - `src/shared/utils/`, `src/utils/` — вспомогательные функции и работа с API;
  - `webpack/webpack.*.js` — общая, dev и prod‑конфигурации webpack.

---

## Запуск и сборка

### Клонирование и установка

```bash
git clone <url_этого_репозитория>
cd TreeD

npm install
```

### Запуск в режиме разработки

```bash
npm run start
```

Dev‑сервер поднимается на **порт 3000** и в конфиге `webpack.dev.js` настроен хост `http://3d-shop:3000`  
(при необходимости можно заменить хост на `localhost` в настройках `devServer`).

В дев‑режиме настроен **прокси на бэкенд `https://treed.pro`**:
- маршруты аутентификации (`/login`, `/register`, `/logout`, `/sanctum`, `/forgot-password`, `/reset-password`);
- все запросы к API по префиксу `/api`.

### Production‑сборка

```bash
npm run build
```

Результат сборки размещается в папке **`dist/`**:
- `dist/index.html`;
- `dist/static/scripts/*` — JS‑бандлы;
- `dist/static/styles/*` — CSS;
- `dist/static/images/*` — оптимизированные изображения.

Папка `dist/` игнорируется `.gitignore` и должна собираться заново после клонирования репозитория.

### Полезные npm‑скрипты

- `npm run start` — дев‑сервер с hot‑reload;
- `npm run build` — production‑сборка;
- `npm run test` — запуск Jest‑тестов;
- `npm run cypress` — запуск Cypress GUI для e2e‑тестов;
- `npm run lint` — ESLint по `src`;
- `npm run stylelint` / `npm run stylelint:fix` — проверка/починка стилей;
- `npm run format` — форматирование `prettier`;
- `npm run check` — последовательный запуск stylelint, eslint и prettier;
- `npm run deploy` — деплой собранного фронта из `dist/` на GitHub Pages.

---