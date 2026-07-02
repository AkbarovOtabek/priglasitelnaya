import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUPLE } from '../data/content';
import { useLang } from '../context/LanguageContext';

// Small rose SVG for envelope corner decorations
function EnvRose({ className = '' }) {
  return (
    <svg viewBox="0 0 90 80" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5,78 C20,55 45,38 58,18 C56,32 42,52 18,72 Z" fill="#7aaa85" opacity="0.55"/>
      <path d="M0,65 C18,46 42,30 62,10 C58,26 38,48 12,68 Z" fill="#8ab892" opacity="0.45"/>
      <path d="M22,72 C36,50 58,34 68,14 C65,28 48,52 28,74 Z" fill="#6e9878" opacity="0.48"/>
      <g transform="translate(52,35)">
        {[0,60,120,180,240,300].map((a,i)=>{const r=a*Math.PI/180,cx=Math.cos(r)*13,cy=Math.sin(r)*13;return<ellipse key={i} cx={cx} cy={cy} rx="10" ry="7" fill={i%2===0?'#f5c8d8':'#efb8cc'} opacity="0.9" transform={`rotate(${a},${cx},${cy})`}/>;})}
        <circle cx="0" cy="0" r="6.5" fill="#e090b4" opacity="0.82"/>
        <circle cx="0" cy="0" r="3.5" fill="#c870a0" opacity="0.72"/>
      </g>
      <g transform="translate(72,16)">
        {[0,72,144,216,288].map((a,i)=>{const r=a*Math.PI/180,cx=Math.cos(r)*9,cy=Math.sin(r)*9;return<ellipse key={i} cx={cx} cy={cy} rx="7.5" ry="5" fill={i%2===0?'#fde8f0':'#f8d4e6'} opacity="0.88" transform={`rotate(${a},${cx},${cy})`}/>;})}
        <circle cx="0" cy="0" r="5" fill="#f0a8c4" opacity="0.76"/>
      </g>
      {[[36,58],[20,38],[62,50]].map(([fx,fy],idx)=>(
        <g key={idx} transform={`translate(${fx},${fy})`}>
          {[0,72,144,216,288].map((a,i)=>{const r=a*Math.PI/180,px=Math.cos(r)*4.5,py=Math.sin(r)*4.5;return<ellipse key={i} cx={px} cy={py} rx="3.8" ry="2.4" fill="#fff8fb" opacity="0.88" transform={`rotate(${a},${px},${py})`}/>;})}
          <circle cx="0" cy="0" r="2" fill="#f8e068" opacity="0.85"/>
        </g>
      ))}
    </svg>
  );
}

export default function EnvelopeGate({ onEnter }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, []);

  const click = () => {
    if (open) return;
    setOpen(true);
    onEnter?.();
    setTimeout(() => {
      document.documentElement.style.overflow = '';
      setGone(true);
    }, 1600);
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-emerald-tint px-6"
          exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: [0.6, 0, 0.2, 1] }}
        >
          {/* Floating bismillah */}
          <motion.p
            className="eyebrow text-base md:text-xl mb-10"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
          >
            {t.hero.eyebrow}
          </motion.p>

          <div
            className={`env interactive ${open ? 'open' : ''}`}
            onClick={click}
            role="button"
            aria-label="open invitation"
          >
            {/* ── Envelope body ── */}
            <div className="env-body">
              <div className="env-pocket" />
              {/* Rose corner decorations on body */}
              <div className="absolute top-0 left-0 w-[42%] h-[70%] pointer-events-none" style={{opacity:0.7}}>
                <EnvRose className="w-full h-full"/>
              </div>
              <div className="absolute top-0 right-0 w-[42%] h-[70%] pointer-events-none" style={{transform:'scaleX(-1)',opacity:0.7}}>
                <EnvRose className="w-full h-full"/>
              </div>
            </div>

            {/* ── Letter ── */}
            <div className="env-letter">
              <div className="text-center relative z-10 px-2 py-1 w-full">
                {/* Top ornament row */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-px flex-1 max-w-[40px]" style={{background:'linear-gradient(to right,transparent,rgba(169,126,31,0.5))'}}/>
                  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#a97e1f" strokeWidth="1.2">
                    <path d="M10 1L11.5 8.5L19 10L11.5 11.5L10 19L8.5 11.5L1 10L8.5 8.5Z"/>
                  </svg>
                  <div className="h-px flex-1 max-w-[40px]" style={{background:'linear-gradient(to left,transparent,rgba(169,126,31,0.5))'}}/>
                </div>

                {/* Pre-title */}
                <p className="eyebrow text-[0.6rem] md:text-[0.72rem] mb-2 opacity-85">{t.hero.pretitle}</p>

                {/* Names — elegant layout */}
                <div className="font-display leading-tight">
                  <div className="text-[1.55rem] md:text-[2.2rem] mb-0.5">
                    <span className="name3d" data-text={COUPLE.bride[lang]}>{COUPLE.bride[lang]}</span>
                  </div>
                  {/* Heart divider */}
                  <motion.div
                    className="text-[#e06080] text-xs my-1 tracking-[0.5em]"
                    animate={{ scale:[1,1.25,1], opacity:[0.7,1,0.7] }}
                    transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
                  >
                    ♡
                  </motion.div>
                  <div className="text-[1.55rem] md:text-[2.2rem] mt-0.5">
                    <span className="name3d" data-text={COUPLE.groom[lang]}>{COUPLE.groom[lang]}</span>
                  </div>
                </div>

                {/* Gold floral divider */}
                <div className="flex items-center justify-center gap-1.5 my-2">
                  <div className="h-px flex-1 max-w-[28px]" style={{background:'linear-gradient(to right,transparent,rgba(198,155,58,0.65))'}}/>
                  <svg viewBox="0 0 16 16" className="w-2.5 h-2.5" fill="#c69b3a" opacity="0.8">
                    <path d="M8 0.5L9 6.5L15.5 8L9 9.5L8 15.5L7 9.5L0.5 8L7 6.5Z"/>
                  </svg>
                  <svg viewBox="0 0 10 10" className="w-2 h-2" fill="#e6c877" opacity="0.7">
                    <circle cx="5" cy="5" r="2.5"/>
                  </svg>
                  <svg viewBox="0 0 16 16" className="w-2.5 h-2.5" fill="#c69b3a" opacity="0.8">
                    <path d="M8 0.5L9 6.5L15.5 8L9 9.5L8 15.5L7 9.5L0.5 8L7 6.5Z"/>
                  </svg>
                  <div className="h-px flex-1 max-w-[28px]" style={{background:'linear-gradient(to left,transparent,rgba(198,155,58,0.65))'}}/>
                </div>

                {/* Date */}
                <p className="tracking-[0.26em] uppercase text-[0.56rem] md:text-[0.64rem]" style={{color:'var(--emerald)'}}>
                  {t.hero.dateLabel}
                </p>
              </div>
            </div>

            {/* ── Flap ── */}
            <div className="env-flap" />

            {/* ── Seal ── */}
            <div className="env-seal">
              <span style={{fontStyle:'italic'}}>{COUPLE.initials}</span>
            </div>
          </div>

          {!open && (
            <motion.p
              className="mt-24 md:mt-28 text-[0.62rem] md:text-xs uppercase tracking-[0.3em]"
              style={{ color: 'var(--ink-soft)' }}
              animate={{ opacity: [0.35, 1, 0.35] }}
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
