import { useEffect, useState } from 'react';
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
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex h-20 w-16 md:h-28 md:w-24 items-center justify-center glass rounded-lg"
        style={{ perspective: 600 }}
      >
        <div className="absolute inset-x-0 top-1/2 h-px bg-gold/25" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={str}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl md:text-6xl text-gold-gradient tabular-nums"
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
      <div className="flex gap-3 md:gap-5">
        {units.map((u) => (
          <FlipUnit key={u.label} value={u.value} label={u.label} />
        ))}
      </div>
    </div>
  );
}
