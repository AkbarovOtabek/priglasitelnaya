import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE } from '../data/content';
import { useLang } from '../context/LanguageContext';

// Полноэкранный конверт-вход: закрыт с сургучной печатью «M & A».
// По нажатию открывается и «переходит внутрь» приглашения.
export default function EnvelopeGate({ onEnter }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  // Блокируем прокрутку, пока конверт не открыт.
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  const click = () => {
    if (open) return;
    setOpen(true);
    onEnter?.(); // старт музыки
    setTimeout(() => {
      document.documentElement.style.overflow = '';
      setGone(true);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-emerald-tint px-6"
          exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }}
          transition={{ duration: 0.9, ease: [0.6, 0, 0.2, 1] }}
        >
          <motion.p
            className="eyebrow text-base md:text-xl mb-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.hero.eyebrow}
          </motion.p>

          <div
            className={`env interactive ${open ? 'open' : ''}`}
            onClick={click}
            role="button"
            aria-label="open invitation"
          >
            {/* Корпус */}
            <div className="env-body">
              <div className="env-pocket" />
            </div>

            {/* Письмо с информацией */}
            <div className="env-letter">
              <div className="text-center px-3">
                <svg viewBox="0 0 40 40" className="mx-auto w-6 h-6 mb-2" fill="none" stroke="#a97e1f" strokeWidth="1">
                  <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" />
                </svg>
                <p className="eyebrow text-[0.7rem] md:text-sm">{t.hero.pretitle}</p>
                <h2 className="font-display text-3xl md:text-5xl leading-tight mt-1">
                  <span className="name3d" data-text={COUPLE.bride[lang]}>{COUPLE.bride[lang]}</span>
                  <span className="mx-2 text-emerald-ink">&amp;</span>
                  <span className="name3d" data-text={COUPLE.groom[lang]}>{COUPLE.groom[lang]}</span>
                </h2>
                <div className="gold-rule w-24 mx-auto my-2" />
                <p className="tracking-[0.28em] uppercase text-[0.65rem] md:text-xs text-emerald-ink">
                  {t.hero.dateLabel}
                </p>
              </div>
            </div>

            {/* Клапан */}
            <div className="env-flap" />

            {/* Сургучная печать с монограммой */}
            <div className="env-seal">{COUPLE.initials}</div>
          </div>

          {!open && (
            <motion.p
              className="mt-24 md:mt-28 text-[0.65rem] md:text-xs uppercase tracking-[0.3em]"
              style={{ color: 'var(--ink-soft)' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              {t.hero.cta}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
