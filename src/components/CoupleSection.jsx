import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Reveal } from './Reveal';
import { COUPLE } from '../data/content';
import { useLang } from '../context/LanguageContext';
import couplePhoto from '../assets/couple.png';

// Floating hearts around the illustration
const HEARTS = [
  { delay: 0,   left: '10%', size: 20 },
  { delay: 0.9, left: '80%', size: 24 },
  { delay: 1.6, left: '52%', size: 15 },
  { delay: 0.4, left: '28%', size: 17 },
  { delay: 2.2, left: '90%', size: 13 },
  { delay: 1.2, left: '68%', size: 22 },
];

function FloatingHeart({ delay, left, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none z-20"
      style={{ left, top: '-12%', fontSize: size, color: '#e87090', lineHeight: 1 }}
      animate={{ y: [0, -60, -120], opacity: [0, 1, 0], scale: [0.5, 1.3, 0.7] }}
      transition={{ duration: 3 + delay * 0.4, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      ♡
    </motion.div>
  );
}

// Tiny sparkle accents
const SPARKLES = [
  { top: '12%', left: '6%', s: 12, d: 0 },
  { top: '20%', left: '92%', s: 10, d: 1.1 },
  { top: '72%', left: '4%', s: 11, d: 0.6 },
  { top: '84%', left: '90%', s: 13, d: 1.7 },
];

export default function CoupleSection() {
  const { lang } = useLang();

  return (
    <section id="couple" className="section flex-col py-20 bg-panel overflow-hidden">
      <Reveal variant="scale" className="w-full max-w-xs sm:max-w-sm px-4 mx-auto">
        <div className="relative">
          {/* Floating hearts */}
          {HEARTS.map((h, i) => <FloatingHeart key={i} {...h} />)}

          {/* Sparkle accents */}
          {SPARKLES.map((sp, i) => (
            <motion.span
              key={`sp-${i}`}
              className="absolute pointer-events-none select-none z-20"
              style={{ top: sp.top, left: sp.left, fontSize: sp.s, color: '#e6c877' }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.25, 0.7], rotate: [0, 90, 0] }}
              transition={{ duration: 3.5 + sp.d, delay: sp.d, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✦
            </motion.span>
          ))}

          {/* Image card with 3D tilt */}
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            glareEnable
            glareMaxOpacity={0.14}
            glareColor="#fff0c8"
            glarePosition="all"
            className="interactive"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Outer glow */}
              <div
                className="absolute -inset-5 rounded-[2.8rem] pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 45%, rgba(230,180,100,0.22), rgba(230,80,120,0.12) 55%, transparent 76%)' }}
              />

              {/* Card frame */}
              <div
                className="relative rounded-[2rem] overflow-hidden"
                style={{
                  background: 'linear-gradient(168deg, #fefaf6 0%, #fdf0e8 100%)',
                  boxShadow: '0 30px 90px rgba(43,53,46,0.2), 0 4px 24px rgba(169,126,31,0.16)',
                  border: '1px solid rgba(198,155,58,0.3)',
                  padding: '10px',
                }}
              >
                {/* Inner border */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ border: '1px solid rgba(198,155,58,0.2)', background: '#fffdf9' }}
                >
                  <motion.img
                    src={couplePhoto}
                    alt="Kelin va kuyov"
                    className="w-full h-auto block"
                    initial={{ scale: 1.06 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    draggable={false}
                  />
                  {/* Soft top light sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.28) 0%, transparent 32%)' }}
                  />
                </div>

                {/* Gold corner ornaments */}
                {[
                  'top:8px;left:8px;borderTop:1px solid;borderLeft:1px solid',
                  'top:8px;right:8px;borderTop:1px solid;borderRight:1px solid',
                  'bottom:8px;left:8px;borderBottom:1px solid;borderLeft:1px solid',
                  'bottom:8px;right:8px;borderBottom:1px solid;borderRight:1px solid',
                ].map((s, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 pointer-events-none"
                    style={{
                      ...Object.fromEntries(s.split(';').map(p => {
                        const [k, v] = p.split(':');
                        return [k.trim(), v?.trim()];
                      }).filter(([k]) => k)),
                      borderColor: 'rgba(198,155,58,0.55)',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </Tilt>

          {/* Names below */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            <p className="font-display text-2xl md:text-3xl tracking-wide">
              <span className="name3d" data-text={COUPLE.groom[lang]}>{COUPLE.groom[lang]}</span>
              <motion.span
                className="mx-3 inline-block"
                style={{ color: '#e06080', fontSize: '1.4rem' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ♡
              </motion.span>
              <span className="name3d" data-text={COUPLE.bride[lang]}>{COUPLE.bride[lang]}</span>
            </p>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
