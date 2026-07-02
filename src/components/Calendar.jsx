import { motion } from 'framer-motion';
import { Divider } from './Ornament';
import { Reveal } from './Reveal';
import { WEDDING_DATE } from '../data/content';
import { useLang } from '../context/LanguageContext';

export default function Calendar() {
  const { t } = useLang();
  const c = t.calendar;

  const d = new Date(WEDDING_DATE);
  const year = d.getFullYear();
  const month = d.getMonth();
  const highlight = d.getDate();

  // Понедельник — первый день недели
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: firstOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <section id="calendar" className="section flex-col py-24 bg-panel">
      <Reveal className="text-center mb-12 px-6">
        <p className="eyebrow text-lg">{c.subtitle}</p>
        <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mt-2">{c.title}</h2>
        <Divider className="mt-6" />
      </Reveal>

      <Reveal delay={0.12} className="w-full max-w-md px-6">
        <div className="glass rounded-3xl p-6 md:p-8">
          <p className="text-center font-display text-2xl md:text-3xl text-emerald-ink mb-6">
            {c.months[month]} {year}
          </p>

          <div className="grid grid-cols-7 gap-1 text-center">
            {c.weekdays.map((w) => (
              <div key={w} className="text-[0.6rem] md:text-xs uppercase tracking-wider text-gold-deep pb-2">
                {w}
              </div>
            ))}

            {cells.map((day, i) => {
              const isDay = day === highlight;
              return (
                <div key={i} className="aspect-square flex items-center justify-center">
                  {day && (
                    <motion.span
                      className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full text-sm ${
                        isDay
                          ? 'bg-gradient-to-br from-gold-deep to-gold text-white font-semibold shadow-[0_6px_20px_rgba(198,155,58,0.5)]'
                          : 'text-ink/75'
                      }`}
                      {...(isDay && {
                        animate: { scale: [1, 1.12, 1] },
                        transition: { duration: 1.8, repeat: Infinity },
                      })}
                    >
                      {isDay ? (
                        <span className="relative">
                          {day}
                          <svg viewBox="0 0 24 24" className="absolute -top-3 -right-3 w-3 h-3 fill-current">
                            <path d="M12 2l2 6 6 .5-4.6 4 1.5 6L12 15l-5.4 3.5 1.5-6L3.5 8.5 9.5 8z" />
                          </svg>
                        </span>
                      ) : (
                        day
                      )}
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="gold-rule w-full mt-6" />
          <p className="text-center text-ink-soft text-sm mt-5 font-display italic text-lg">
            {t.hero.dateLabel}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
