// ────────────────────────────────────────────────────────────────
//  Единый источник контента. Замените значения на реальные данные.
// ────────────────────────────────────────────────────────────────

export const WEDDING_DATE = '2026-08-08T19:00:00+05:00'; // ISO, Asia/Tashkent

export const COUPLE = {
  groom: { uz: 'Adxam', ru: 'Адхам' },
  bride: { uz: 'Malika', ru: 'Малика' },
  initials: 'M & A',
};

export const content = {
  uz: {
    langName: "O'zbekcha",
    preloader: 'Taklifnoma yuklanmoqda',
    hero: {
      eyebrow: 'Bismillahir Rohmanir Rohiym',
      pretitle: 'Nikoh to‘yimizga taklif etamiz',
      and: 'va',
      dateLabel: '08 Avgust, 2026',
      cta: 'Taklifnomani ochish',
      scroll: 'Pastga suring',
    },
    countdown: {
      title: 'Bayramgacha qoldi',
      days: 'kun',
      hours: 'soat',
      minutes: 'daqiqa',
      seconds: 'soniya',
    },
    // Анимационная (мультяжная) секция вместо «нашей истории»
    love: {
      title: 'Ikki qalb — bitta qissa',
      subtitle: 'Muhabbat ila boshlangan yo‘l',
      caption: 'Alloh bizni bir-birimizga atagan',
    },
    ceremony: {
      title: 'Marosim',
      subtitle: 'Sizni shu quvonchli kunimizda ko‘rishdan mamnunmiz',
      dayLabel: '08 Avgust, 2026 · Shanba',
      events: [
        { key: 'nikoh', name: 'Nikoh marosimi', time: '19:00', note: 'Duo, fotiha va ziyofat' },
      ],
    },
    calendar: {
      title: 'Sanani belgilang',
      subtitle: 'Bu kunni kalendaringizga qo‘shing',
      add: 'Kalendarga qo‘shish',
      google: 'Google Calendar',
      ics: 'Apple · .ics',
      weekdays: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],      dayNames: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],      months: [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
        'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
      ],
      eventLabel: 'Nikoh to‘yi',
    },
    venue: {
      title: 'To‘y qayerda bo‘ladi',
      subtitle: 'To‘yxona haqida',
      name: 'Farovon to‘yxonasi',
      address: 'Navoiy sh., Karvon ko‘chasi 336',
      videoTitle: 'To‘yxona videosi',
      videoHint: 'Restoran videosini shu yerga joylang',
    },
    location: {
      title: 'Manzil',
      subtitle: 'Farovon to‘yxonasi',
      route: 'Marshrut qurish',
    },
    footer: {
      thanks: 'Sizni kutib qolamiz',
      names: 'Adxam & Malika',
    },
  },

  ru: {
    langName: 'Русский',
    preloader: 'Загрузка приглашения',
    hero: {
      eyebrow: 'Бисмиллахир Рохманир Рохийм',
      pretitle: 'Приглашаем вас на наш никох',
      and: 'и',
      dateLabel: '08 Августа, 2026',
      cta: 'Открыть приглашение',
      scroll: 'Листайте вниз',
    },
    countdown: {
      title: 'До торжества осталось',
      days: 'дней',
      hours: 'часов',
      minutes: 'минут',
      seconds: 'секунд',
    },
    love: {
      title: 'Два сердца — одна история',
      subtitle: 'Путь, начатый с любви',
      caption: 'Аллах создал нас друг для друга',
    },
    ceremony: {
      title: 'Церемония',
      subtitle: 'Будем рады видеть вас в этот радостный день',
      dayLabel: '08 Августа, 2026 · Суббота',
      events: [
        { key: 'nikoh', name: 'Церемония никох', time: '19:00', note: 'Дуа, благословение и ужин' },
      ],
    },
    calendar: {
      title: 'Отметьте дату',
      subtitle: 'Добавьте этот день в свой календарь',
      add: 'Добавить в календарь',
      google: 'Google Calendar',
      ics: 'Apple · .ics',
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      months: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
      ],
      eventLabel: 'Никох',
    },
    venue: {
      title: 'Где пройдёт свадьба',
      subtitle: 'О месте торжества',
      name: 'Той-хона «Farovon»',
      address: 'г. Навои, ул. Карвон 336',
      videoTitle: 'Видео ресторана',
      videoHint: 'Разместите здесь видео ресторана',
    },
    location: {
      title: 'Локация',
      subtitle: 'Той-хона «Farovon»',
      route: 'Построить маршрут',
    },
    footer: {
      thanks: 'С нетерпением ждём вас',
      names: 'Adxam & Malika',
    },
  },
};

// Координаты той-ханы «Farovon» (Yandex Maps org 66229812019)
export const VENUE = {
  lat: 40.130101,
  lng: 65.387291,
  gmaps: 'https://www.google.com/maps/dir/?api=1&destination=40.130101,65.387291',
  yandex: 'https://yandex.uz/maps/org/farovon/66229812019/?ll=65.387291%2C40.130101&z=17',
  // Видео ресторана: положите файл в /public и укажите путь, напр. '/restaurant.mp4'
  video: '',
  poster: '',
};
