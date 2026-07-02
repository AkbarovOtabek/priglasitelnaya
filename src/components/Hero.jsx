import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Countdown from './Countdown';
import { Divider } from './Ornament';
import { COUPLE } from '../data/content';
import { useLang } from '../context/LanguageContext';

const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero({ onScrollNext }) {
  const { t, lang } = useLang();
  const sectionRef = useRef(null);
  const [sceneActive, setSceneActive] = useState(true);

  // Пауза WebGL-цикла, когда Hero вне экрана.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSceneActive(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="section flex-col bg-emerald-tint">
      {/* 3D-фон: кольца + золотая пыль */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-page" />}>
          <HeroScene active={sceneActive} />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-ivory" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          className="eyebrow text-base md:text-xl"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          {t.hero.eyebrow}
        </motion.p>

        {/* отступ под парящие 3D-кольца */}
        <div className="h-28 md:h-36" />

        <motion.h1
          className="font-display text-5xl md:text-8xl leading-none text-gold-gradient"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {COUPLE.bride[lang]}
          <span className="mx-3 md:mx-5 text-emerald-ink align-middle text-3xl md:text-6xl">&amp;</span>
          {COUPLE.groom[lang]}
        </motion.h1>

        <motion.p
          className="mt-4 font-display text-xl md:text-2xl text-ink/80 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          {t.hero.pretitle}
        </motion.p>

        <Divider className="my-6" />

        <motion.p
          className="tracking-[0.35em] uppercase text-sm md:text-base text-gold-deep"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          {t.hero.dateLabel}
        </motion.p>

        <motion.div
          className="mt-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <Countdown />
        </motion.div>

        <motion.button
          onClick={onScrollNext}
          className="btn-gold interactive mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t.hero.scroll}
        </motion.button>
      </div>
    </section>
  );
}
