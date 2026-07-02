import { useEffect, useState, Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WEDDING_DATE } from '../data/content';
import { useLang } from '../context/LanguageContext';

function diff() {
  const d = new Date(WEDDING_DATE).getTime() - Date.now();
  const clamp = Math.max(0, d);
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp / 3600000) % 24),
    minutes: Math.floor((clamp / 60000) % 60),
    seconds: Math.floor((clamp / 1000) % 60),
  };
}

function FlipUnit({ value, label }) {
  const str = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="flip-card flex h-20 w-16 md:h-28 md:w-24 items-center justify-center"
        style={{ perspective: 700 }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={str}
            initial={{ rotateX: -90, opacity: 0, y: -6 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 90, opacity: 0, y: 6 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 font-display text-4xl md:text-6xl text-gold-gradient tabular-nums leading-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[0.62rem] md:text-xs uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { t } = useLang();
  const [time, setTime] = useState(diff());

  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days, label: t.countdown.days },
    { value: time.hours, label: t.countdown.hours },
    { value: time.minutes, label: t.countdown.minutes },
    { value: time.seconds, label: t.countdown.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="eyebrow text-sm md:text-base">{t.countdown.title}</p>
      <div className="flex items-start gap-2 md:gap-3.5">
        {units.map((u, i) => (
          <Fragment key={u.label}>
            <FlipUnit value={u.value} label={u.label} />
            {i < units.length - 1 && (
              <motion.span
                className="flip-colon font-display text-3xl md:text-5xl leading-[2.1] md:leading-[2.2] select-none"
                animate={{ opacity: [0.35, 0.85, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                :
              </motion.span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
