import { motion } from 'framer-motion';
import { Divider } from './Ornament';
import { Reveal } from './Reveal';
import { useLang } from '../context/LanguageContext';
import { useDeviceCapability } from '../hooks/useDeviceCapability';

// Мультяжная анимированная сцена «история любви» (светлая палитра).
export default function LoveAnimation() {
  const { t } = useLang();
  const { isLowPower } = useDeviceCapability();

  const sparkles = Array.from({ length: isLowPower ? 12 : 22 }, (_, i) => ({
    x: (i * 53) % 600,
    y: (i * 31) % 200,
    r: 0.8 + (i % 3) * 0.7,
    d: (i % 5) * 0.4,
  }));

  const hearts = Array.from({ length: isLowPower ? 4 : 6 }, (_, i) => ({
    x: 210 + i * 30,
    delay: i * 0.7,
    dur: 4 + (i % 3),
  }));

  return (
    <section id="love" className="section flex-col py-24 bg-panel overflow-hidden">
      <Reveal className="text-center mb-10 px-6">
        <p className="eyebrow text-lg">{t.love.subtitle}</p>
        <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mt-2">{t.love.title}</h2>
        <Divider className="mt-6" />
      </Reveal>

      <Reveal delay={0.15} className="w-full max-w-3xl px-6">
        <div className="glass rounded-3xl p-3 md:p-4">
          <svg viewBox="0 0 600 420" className="w-full h-auto rounded-2xl" role="img">
            <defs>
              <radialGradient id="sky" cx="50%" cy="28%" r="85%">
                <stop offset="0%" stopColor="#fdfaf3" />
                <stop offset="60%" stopColor="#f3ede0" />
                <stop offset="100%" stopColor="#e8eee9" />
              </radialGradient>
              <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e6c877" />
                <stop offset="100%" stopColor="#a97e1f" />
              </linearGradient>
              <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Небо (светлое) */}
            <rect width="600" height="420" fill="url(#sky)" />

            {/* Золотые искры (мерцание) */}
            {sparkles.map((s, i) => (
              <motion.circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#c69b3a"
                animate={{ opacity: [0.15, 0.7, 0.15] }}
                transition={{ duration: 2 + s.d, repeat: Infinity, delay: s.d }}
              />
            ))}

            {/* Солнце/ореол с полумесяцем */}
            <motion.g
              filter="url(#soft)"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="500" cy="80" r="40" fill="#f0d980" opacity="0.35" />
              <path d="M512 58a26 26 0 1 0 0 44 20 20 0 1 1 0-44z" fill="url(#goldFill)" />
            </motion.g>

            {/* Летящие сердечки */}
            {hearts.map((h, i) => (
              <motion.path
                key={i}
                d="M0 3 C0 -1 -6 -1 -6 3 C-6 7 0 10 0 12 C0 10 6 7 6 3 C6 -1 0 -1 0 3 Z"
                fill="#b6455a"
                initial={{ opacity: 0 }}
                animate={{ y: [0, -150], x: [0, i % 2 ? 18 : -18], opacity: [0, 0.9, 0] }}
                transition={{ duration: h.dur, repeat: Infinity, delay: h.delay, ease: 'easeOut' }}
                transform={`translate(${h.x + 16} 200) scale(1.6)`}
              />
            ))}

            {/* Силуэт мечети (изумруд) */}
            <g stroke="#a97e1f" strokeWidth="1.5" fill="#0b3d2e" opacity="0.92">
              <path d="M60 360 v-60 a40 40 0 0 1 80 0 v60 z" />
              <path d="M470 360 v-70 a34 34 0 0 1 68 0 v70 z" />
            </g>
            <path d="M100 240 q6 -22 6 -30 q0 8 6 30" fill="url(#goldFill)" />
            <path d="M504 220 q5 -18 5 -26 q0 8 5 26" fill="url(#goldFill)" />

            {/* Земля */}
            <rect y="360" width="600" height="60" fill="#0b3d2e" opacity="0.9" />
            <line x1="0" y1="360" x2="600" y2="360" stroke="#c69b3a" strokeWidth="1.5" opacity="0.7" />

            {/* Пара под аркой */}
            <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <path
                d="M235 360 v-70 a65 55 0 0 1 130 0 v70"
                fill="none"
                stroke="url(#goldFill)"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <circle cx="300" cy="228" r="4" fill="url(#goldFill)" />

              {/* Жених */}
              <g>
                <rect x="272" y="300" width="26" height="60" rx="10" fill="#0b3d2e" stroke="#a97e1f" />
                <circle cx="285" cy="288" r="14" fill="#f3d9b0" stroke="#a97e1f" />
                <path d="M273 282 q12 -14 24 0 z" fill="url(#goldFill)" />
              </g>

              {/* Невеста */}
              <g>
                <path d="M302 360 v-46 a16 16 0 0 1 32 0 v46 z" fill="#0b3d2e" stroke="#a97e1f" />
                <circle cx="318" cy="290" r="14" fill="#f3d9b0" stroke="#a97e1f" />
                <path
                  d="M304 288 q14 -20 28 0 q2 30 -2 60 q-12 -8 -24 0 q-4 -30 -2 -60 z"
                  fill="#ffffff"
                  opacity="0.7"
                  stroke="#a97e1f"
                  strokeWidth="0.6"
                />
              </g>

              {/* сердечко между ними */}
              <motion.path
                d="M301 322 C301 317 294 317 294 322 C294 327 301 331 301 334 C301 331 308 327 308 322 C308 317 301 317 301 322 Z"
                fill="#b6455a"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{ transformOrigin: '301px 325px' }}
              />
            </motion.g>
          </svg>
        </div>
        <p className="text-center eyebrow text-base md:text-lg mt-6">{t.love.caption}</p>
      </Reveal>
    </section>
  );
}
