import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE } from '../data/content';
import { useLang } from '../context/LanguageContext';

export default function Preloader({ onDone }) {
  const { t } = useLang();
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setGone(true), 650);
        setTimeout(() => onDone?.(), 1500);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 130);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-emerald-tint"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Занавес-створки */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ivory-light to-ivory"
            initial={{ x: 0 }}
            animate={gone ? { x: '-100%' } : { x: 0 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ivory-light to-ivory"
            initial={{ x: 0 }}
            animate={gone ? { x: '100%' } : { x: 0 }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Раскрывающийся орнамент → инициалы */}
            <svg viewBox="0 0 300 300" className="w-52 h-52 md:w-64 md:h-64" fill="none">
              <motion.g
                stroke="#a97e1f"
                strokeWidth="1"
                initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: '150px 150px' }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.rect
                    key={i}
                    x="95"
                    y="95"
                    width="110"
                    height="110"
                    transform={`rotate(${i * 30} 150 150)`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  />
                ))}
                <circle cx="150" cy="150" r="72" opacity="0.5" />
                <circle cx="150" cy="150" r="52" opacity="0.7" />
              </motion.g>
              <motion.text
                x="150"
                y="150"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#a97e1f"
                fontFamily="Cormorant Garamond, serif"
                fontSize="52"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.9 }}
              >
                {COUPLE.initials}
              </motion.text>
            </svg>

            <motion.p
              className="mt-6 tracking-[0.35em] text-xs uppercase text-ink-soft font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {t.preloader}
            </motion.p>

            {/* Золотая нить-прогресс */}
            <div className="relative mt-6 h-[2px] w-56 overflow-hidden bg-ink/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-deep to-gold"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mt-3 font-display text-gold-deep text-lg tabular-nums">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
