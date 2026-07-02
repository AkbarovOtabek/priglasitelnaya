import { motion } from 'framer-motion';
import { Divider } from './Ornament';
import { Reveal } from './Reveal';
import { VENUE } from '../data/content';
import { useLang } from '../context/LanguageContext';

export default function Venue() {
  const { t } = useLang();
  const v = t.venue;

  return (
    <section id="venue" className="section flex-col py-24 bg-page">
      <Reveal className="text-center mb-12 px-6">
        <p className="eyebrow text-lg">{v.subtitle}</p>
        <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mt-2">{v.title}</h2>
        <Divider className="mt-6" />
      </Reveal>

      <Reveal delay={0.12} className="w-full max-w-3xl px-6">
        {/* Название и адрес то‘йхоны */}
        <div className="text-center mb-8">
          <h3 className="font-display text-3xl md:text-4xl text-emerald-ink">{v.name}</h3>
          <p className="text-ink-soft mt-2 flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {v.address}
          </p>
        </div>

        {/* Видео ресторана */}
        <div className="glass rounded-2xl p-3">
          <div className="relative w-full overflow-hidden rounded-xl bg-ivory-light" style={{ aspectRatio: '16 / 9' }}>
            {VENUE.video ? (
              <video
                src={VENUE.video}
                poster={VENUE.poster || undefined}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              // Плейсхолдер: элегантный экран, пока видео не добавлено
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 overflow-hidden">
                <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 120% at 50% 30%, rgba(230,200,119,0.16), transparent 65%)' }} />
                <motion.span
                  className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-white/70 backdrop-blur"
                  animate={{ y: [0, -8, 0], boxShadow: ['0 8px 24px rgba(198,155,58,0.18)', '0 14px 36px rgba(198,155,58,0.34)', '0 8px 24px rgba(198,155,58,0.18)'] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="absolute inline-flex h-full w-full rounded-full border border-gold/40 animate-ping opacity-40" />
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-gold-deep translate-x-[1px]">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.span>
                <p className="relative font-display text-2xl text-emerald-ink">{v.videoTitle}</p>
                <p className="relative text-ink-soft text-sm px-6 max-w-sm">{v.videoHint}</p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
