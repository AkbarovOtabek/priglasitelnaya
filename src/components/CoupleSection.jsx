import { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { COUPLE } from '../data/content';
import { useLang } from '../context/LanguageContext';
import CoupleSVG from './CoupleSVG';

// Floating hearts around the photo
const HEARTS = [
  { delay: 0,   left: '12%', size: 18 },
  { delay: 0.9, left: '78%', size: 22 },
  { delay: 1.6, left: '52%', size: 14 },
  { delay: 0.4, left: '30%', size: 16 },
  { delay: 2.2, left: '88%', size: 12 },
  { delay: 1.2, left: '68%', size: 20 },
];

function FloatingHeart({ delay, left, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left, top: '5%', fontSize: size, color: '#e87090', lineHeight: 1 }}
      animate={{ y: [0, -55, -110], opacity: [0, 1, 0], scale: [0.5, 1.3, 0.7] }}
      transition={{ duration: 3 + delay * 0.4, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      ♡
    </motion.div>
  );
}

export default function CoupleSection() {
  const { lang } = useLang();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="couple" className="section flex-col py-20 bg-panel overflow-hidden">
      <Reveal variant="scale" className="w-full max-w-xs sm:max-w-sm px-4 mx-auto">
        <div className="relative">
          {/* Floating hearts */}
          {HEARTS.map((h, i) => <FloatingHeart key={i} {...h} />)}

          {/* Image card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Outer glow */}
            <div
              className="absolute -inset-4 rounded-[2.5rem] pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(230,180,100,0.18), rgba(230,80,120,0.1) 55%, transparent 75%)' }}
            />

            {/* Card frame */}
            <div
              className="relative rounded-[2rem] overflow-hidden"
              style={{
                background: 'linear-gradient(168deg, #fefaf6 0%, #fdf0e8 100%)',
                boxShadow: '0 28px 80px rgba(43,53,46,0.16), 0 4px 24px rgba(169,126,31,0.12)',
                border: '1px solid rgba(198,155,58,0.22)',
                padding: '10px',
              }}
            >
              {/* Inner border */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(198,155,58,0.18)' }}
              >
                {/* Photo (if user places /couple.png in public/) */}
                {!imgError && (
                  <img
                    src="/couple.png"
                    alt="Bride and Groom"
                    className="w-full h-auto block"
                    style={{ display: imgLoaded ? 'block' : 'none' }}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgError(true)}
                  />
                )}

                {/* SVG illustration fallback (always shown until real image loads) */}
                {(!imgLoaded || imgError) && (
                  <CoupleSVG className="w-full h-auto" />
                )}
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
                    borderColor: 'rgba(198,155,58,0.5)',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Names below */}
          <motion.div
            className="text-center mt-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            <p className="font-display text-2xl md:text-3xl tracking-wide">
              <span className="name3d" data-text={COUPLE.bride[lang]}>{COUPLE.bride[lang]}</span>
              <motion.span
                className="mx-3 inline-block"
                style={{ color: '#e06080', fontSize: '1.4rem' }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ♡
              </motion.span>
              <span className="name3d" data-text={COUPLE.groom[lang]}>{COUPLE.groom[lang]}</span>
            </p>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
