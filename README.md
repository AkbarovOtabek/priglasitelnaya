# Adxam & Malika — Islamic Nikoh e-Invitation

Премиальный одностраничный сайт-приглашение на никох/той с 3D-сценами,
кинематографичными анимациями и bilingual (UZ/RU) интерфейсом.

## ✨ Возможности

- **Preloader** — раскрывающийся исламский орнамент → инициалы пары, золотая нить-прогресс, занавес.
- **Hero** — 3D-сцена (React Three Fiber): парящая золотая пыль + светящиеся 3D-имена с bloom-свечением, параллакс от мыши/гироскопа.
- **Countdown** — 3D flip-карточки обратного отсчёта.
- **Наша история** — параллакс-таймлайн с 3D-tilt карточками (scroll-триггеры).
- **Детали церемонии** — glassmorphism-карточки Nikoh/Той с 3D tilt и исламскими иконками, декоративная арка.
- **Локация** — тёмная интерактивная карта (Leaflet) с золотым пином (bounce-анимация) + кнопки маршрута.
- **Галерея** — Swiper 3D-coverflow с drag/swipe и лайтбоксом (zoom-переход).
- **RSVP** — форма с анимацией «золотой линии» + конфетти при отправке.
- **Музыка** — Howler.js, плавающая кнопка play/pause с canvas-визуализацией волны.
- **Footer** — бесшовный анимированный орнаментальный бордюр.
- Кастомный курсор (золотая точка + догоняющее кольцо), smooth-scroll (Lenis), переключатель языка UZ/RU.
- Адаптивность и оптимизация: определение слабых устройств (`navigator.hardwareConcurrency`/`deviceMemory`) → меньше частиц и отключение bloom; lazy-load тяжёлых секций и Suspense-фоллбеки.

## 🧱 Стек

React 18 · Vite · React Three Fiber + drei + postprocessing · Framer Motion · GSAP + ScrollTrigger · Lenis · Tailwind CSS · Howler.js · Leaflet · Swiper · canvas-confetti · react-parallax-tilt

## 🚀 Установка и запуск

```bash
npm install      # установить зависимости
npm run dev      # dev-сервер (http://localhost:5173)
npm run build    # production-сборка в dist/
npm run preview  # предпросмотр production-сборки
```

## 🗂 Структура проекта

```
.
├── index.html                    # подключение шрифтов (Cormorant / Jost / Amiri)
├── vite.config.js
├── tailwind.config.js            # тема: изумруд #0b3d2e, золото #d4af37, крем #f8f1e5, бордо
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                   # композиция секций, preloader, smooth-scroll
    ├── styles.css                # Tailwind + кастомные стили (glass, курсор, кнопки, поля)
    ├── 123.mp3                   # фоновая музыка (замените на свою)
    ├── data/
    │   └── content.js            # ⬅️ ВЕСЬ КОНТЕНТ: имена, дата, места, координаты, галерея
    ├── context/
    │   └── LanguageContext.jsx   # UZ/RU переключатель
    ├── hooks/
    │   ├── useDeviceCapability.js# определение слабых устройств
    │   └── useSmoothScroll.js    # Lenis + GSAP ScrollTrigger
    └── components/
        ├── Preloader.jsx
        ├── CustomCursor.jsx
        ├── LanguageToggle.jsx
        ├── MusicPlayer.jsx
        ├── Hero.jsx
        ├── HeroScene.jsx         # R3F: частицы, 3D-имена, bloom
        ├── Countdown.jsx
        ├── Story.jsx
        ├── Ceremony.jsx
        ├── LocationMap.jsx
        ├── Gallery.jsx
        ├── Rsvp.jsx
        ├── Footer.jsx
        ├── Ornament.jsx          # SVG-орнаменты (звезда, бордюр, арка, divider)
        └── Reveal.jsx            # Framer Motion appear-обёртка
```

## ✏️ Как заменить контент

Почти всё редактируется в одном файле — **`src/data/content.js`**:

| Что | Где |
|---|---|
| Имена жениха/невесты | `COUPLE` |
| **Дата и время** свадьбы | `WEDDING_DATE` (ISO, часовой пояс Asia/Tashkent `+05:00`) |
| Тексты UZ/RU (заголовки, история, события, RSVP) | `content.uz` / `content.ru` |
| Адрес и время церемоний | `content.*.ceremony.events` |
| Координаты той-ханы + ссылки на маршрут | `VENUE` |
| Фото галереи | `GALLERY` (замените Unsplash-ссылки на свои фото из `public/`) |
| Фоновая музыка | замените `src/123.mp3` |

> ⚠️ **Countdown.** Обратный отсчёт считает до `WEDDING_DATE`. Сейчас установлена
> дата **08.08.2026** (как в оригинальной ссылке). Если она уже в прошлом,
> счётчик покажет нули — укажите будущую дату, чтобы он «тикал».

## 📮 Приём RSVP

Сейчас форма показывает конфетти и сообщение об успехе локально (без бэкенда).
Чтобы принимать заявки, в `src/components/Rsvp.jsx` в функции `submit` отправьте
`form` на ваш эндпоинт — например, Google Forms, Telegram-бот или любой API:

```js
await fetch('https://ваш-endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

## 📱 Производительность на слабых устройствах

`useDeviceCapability` автоматически снижает число частиц и отключает bloom
на мобильных / устройствах с ≤4 ядрами или ≤4 ГБ памяти. Тонкая настройка —
в `src/hooks/useDeviceCapability.js`.
