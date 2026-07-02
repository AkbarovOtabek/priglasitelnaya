import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Arch, Divider } from './Ornament';
import { Reveal } from './Reveal';
import { useLang } from '../context/LanguageContext';

function NikohIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M30 8a16 16 0 1 0 0 32 13 13 0 1 1 0-32z" />
      <path d="M36 18l1.6 3.2L41 22l-3.4.8L36 26l-1.6-3.2L31 22l3.4-.8z" fill="currentColor" />
    </svg>
  );
}

export default function Ceremony() {
  const { t } = useLang();
  const ev = t.ceremony.events[0];

  return (
    <section id="ceremony" className="section flex-col py-24 bg-page">
      <Arch className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-[75%] opacity-[0.06]" stroke="#0b3d2e" />

      <Reveal className="text-center mb-12 px-6">
        <p className="eyebrow text-lg">{t.ceremony.subtitle}</p>
        <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mt-2">{t.ceremony.title}</h2>
        <Divider className="mt-6" />
      </Reveal>

      <Reveal delay={0.12} className="w-full max-w-lg px-6">
        <Tilt
          tiltMaxAngleX={7}
          tiltMaxAngleY={7}
          glareEnable
          glareMaxOpacity={0.12}
          glareColor="#e6c877"
          className="interactive"
        >
          <div className="relative glass rounded-[28px] p-10 md:p-14 overflow-hidden text-center">
            {/* золотые уголки */}
            {['top-4 left-4', 'top-4 right-4 rotate-90', 'bottom-4 right-4 rotate-180', 'bottom-4 left-4 -rotate-90'].map(
              (pos) => (
                <span key={pos} className={`absolute ${pos} w-6 h-6 border-t border-l border-gold/60`} />
              )
            )}

            <p className="tracking-[0.28em] uppercase text-gold-deep text-sm">{t.ceremony.dayLabel}</p>
            <div className="gold-rule w-24 mx-auto my-6" />

            <motion.span
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-ivory-light shadow-[0_8px_24px_rgba(198,155,58,0.2)]"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <NikohIcon />
            </motion.span>

            <h3 className="font-display text-3xl md:text-4xl text-emerald-ink mt-6">{ev.name}</h3>
            <p className="font-display text-5xl md:text-6xl text-gold-gradient mt-3">{ev.time}</p>
            <p className="text-ink-soft mt-4">{ev.note}</p>
          </div>
        </Tilt>
      </Reveal>
    </section>
  );
}
