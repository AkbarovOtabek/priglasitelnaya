import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Countdown from './Countdown';
import { Divider } from './Ornament';
import { COUPLE } from '../data/content';
import { useLang } from '../context/LanguageContext';

const HeroScene = lazy(() => import('./HeroScene'));
const Rings3D = lazy(() => import('./Rings3D'));

export default function Hero({ active = true, onScrollNext }) {
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
      {/* 3D-фон: золотая пыль, искры и парящие сердца */}
      <div className="absolute inset-0 z-0">
        {active && (
          <Suspense fallback={<div className="absolute inset-0 bg-page" />}>
            <HeroScene active={sceneActive} />
          </Suspense>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-ivory" />

      {active && (
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <motion.p
            className="eyebrow text-base md:text-xl"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {t.hero.eyebrow}
          </motion.p>

          {/* Парящие 3D обручальные кольца */}
          <motion.div
            className="relative mt-2 mb-0"
            initial={{ opacity: 0, scale: 0.8, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Мягкое золотое свечение под кольцами */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(230,190,90,0.28) 0%, rgba(230,140,90,0.1) 45%, transparent 72%)' }}
            />
            <Suspense fallback={<div style={{ width: 'clamp(210px,44vw,300px)', height: 'clamp(210px,44vw,300px)' }} />}>
              <Rings3D
                active={sceneActive}
                className="relative z-10"
                style={{ width: 'clamp(210px, 44vw, 300px)', height: 'clamp(210px, 44vw, 300px)' }}
              />
            </Suspense>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-8xl leading-none text-gold-gradient -mt-2"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="name3d" data-text={COUPLE.groom[lang]}>{COUPLE.groom[lang]}</span>
            <span className="mx-3 md:mx-5 text-emerald-ink align-middle text-3xl md:text-6xl">&amp;</span>
            <span className="name3d" data-text={COUPLE.bride[lang]}>{COUPLE.bride[lang]}</span>
          </motion.h1>

          <motion.p
            className="mt-4 font-display text-xl md:text-2xl text-ink/80 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 1 }}
          >
            {t.hero.pretitle}
          </motion.p>

          <Divider className="my-6" />

          <motion.p
            className="tracking-[0.35em] uppercase text-sm md:text-base text-gold-deep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 1 }}
          >
            {t.hero.dateLabel}
          </motion.p>

          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 1 }}
          >
            <Countdown />
          </motion.div>

          <motion.button
            onClick={onScrollNext}
            className="btn-gold interactive mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.scroll}
          </motion.button>
        </div>
      )}
    </section>
  );
}
