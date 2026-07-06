import { motion } from 'framer-motion';
import { ArabesqueBorder, StarBurst } from './Ornament';
import { useLang } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative bg-panel pt-8 pb-14 overflow-hidden">
      {/* Бесшовный анимированный орнаментальный бордюр */}
      <div className="relative h-10 w-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <ArabesqueBorder className="h-10 w-[100vw] shrink-0" />
          <ArabesqueBorder className="h-10 w-[100vw] shrink-0" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center text-center px-6 mt-10">
        <StarBurst className="w-16 h-16 mb-6 opacity-70" spin />
        <p className="eyebrow text-lg">{t.footer.thanks}</p>
        <h3 className="font-display text-4xl md:text-5xl text-gold-gradient mt-3">{t.footer.names}</h3>
        <p className="text-ink-soft text-xs tracking-[0.25em] uppercase mt-8">
          Bismillah · 08.08.2026 · Navoiy
        </p>
        <p className="text-ink/40 text-[0.65rem] mt-4">
          Made with love
        </p>
      </div>
    </footer>
  );
}
