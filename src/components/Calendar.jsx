// Calendar redesigned with floral decorations (roses, leaves, ribbon bow)
import { motion } from 'framer-motion';
import { WEDDING_DATE } from '../data/content';
import { useLang } from '../context/LanguageContext';
import { Reveal } from './Reveal';

// ── Floral corner decoration ──────────────────────────────────────
function FloralCorner({ flip = false }) {
  return (
    <svg
      viewBox="0 0 200 190"
      style={flip ? { transform: 'scaleX(-1)' } : {}}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Branch stems */}
      <path d="M0,190 C22,154 60,112 102,66" fill="none" stroke="#5a8a68" strokeWidth="1.5" opacity="0.6"/>
      <path d="M10,182 C38,148 78,112 118,72" fill="none" stroke="#6a9878" strokeWidth="0.8" opacity="0.38"/>
      {/* Leaves */}
      <path d="M14,184 C34,144 70,104 86,64 C84,80 68,118 38,160 Z" fill="#7aaa85" opacity="0.6"/>
      <path d="M6,154 C36,116 74,86 96,46 C93,64 70,98 34,142 Z" fill="#8ab892" opacity="0.5"/>
      <path d="M48,172 C70,132 104,102 120,66 C118,84 96,120 62,170 Z" fill="#6e9878" opacity="0.55"/>
      <path d="M82,164 C102,126 134,98 148,60 C144,80 124,114 88,162 Z" fill="#88a88e" opacity="0.44"/>
      <path d="M24,114 C58,82 98,56 124,22 C118,44 92,72 54,112 Z" fill="#82b08a" opacity="0.5"/>
      <path d="M60,148 C78,118 108,92 130,58 C126,76 104,106 66,146 Z" fill="#92b895" opacity="0.42"/>
      {/* Rose 1 — large */}
      <g transform="translate(72,82)">
        {[0,60,120,180,240,300].map((a, i) => {
          const rad = a * Math.PI / 180;
          const cx = Math.cos(rad) * 20, cy = Math.sin(rad) * 20;
          return <ellipse key={i} cx={cx} cy={cy} rx="15" ry="10" fill={i%2===0?'#f5c8d8':'#efb8cc'} opacity="0.88" transform={`rotate(${a},${cx},${cy})`}/>;
        })}
        {[30,90,150,210,270,330].map((a, i) => {
          const rad = a * Math.PI / 180;
          const cx = Math.cos(rad) * 10, cy = Math.sin(rad) * 10;
          return <ellipse key={i} cx={cx} cy={cy} rx="9" ry="6" fill="#f2c0d2" opacity="0.8" transform={`rotate(${a},${cx},${cy})`}/>;
        })}
        <circle cx="0" cy="0" r="8" fill="#e090b4" opacity="0.8"/>
        <circle cx="0" cy="0" r="4.5" fill="#c870a0" opacity="0.7"/>
        <circle cx="-1.5" cy="-1.5" r="2" fill="#fff5f8" opacity="0.55"/>
      </g>
      {/* Rose 2 — medium */}
      <g transform="translate(138,38)">
        {[0,60,120,180,240,300].map((a, i) => {
          const rad = a * Math.PI / 180;
          const cx = Math.cos(rad) * 14, cy = Math.sin(rad) * 14;
          return <ellipse key={i} cx={cx} cy={cy} rx="11" ry="7.5" fill={i%2===0?'#fde8f0':'#f8d4e6'} opacity="0.9" transform={`rotate(${a},${cx},${cy})`}/>;
        })}
        <circle cx="0" cy="0" r="7" fill="#f0a8c4" opacity="0.76"/>
        <circle cx="0" cy="0" r="3.8" fill="#d888a8" opacity="0.68"/>
      </g>
      {/* Rose 3 — small bud */}
      <g transform="translate(30,118)">
        {[0,72,144,216,288].map((a, i) => {
          const rad = a * Math.PI / 180;
          const cx = Math.cos(rad) * 11, cy = Math.sin(rad) * 11;
          return <ellipse key={i} cx={cx} cy={cy} rx="9.5" ry="6" fill={i%2===0?'#f8d8e8':'#f2c8de'} opacity="0.86" transform={`rotate(${a},${cx},${cy})`}/>;
        })}
        <circle cx="0" cy="0" r="6" fill="#e090b0" opacity="0.74"/>
        <circle cx="0" cy="0" r="3.2" fill="#c870a0" opacity="0.64"/>
      </g>
      {/* Rose 4 — tiny accent */}
      <g transform="translate(108,48)">
        {[0,72,144,216,288].map((a, i) => {
          const rad = a * Math.PI / 180;
          const cx = Math.cos(rad) * 8, cy = Math.sin(rad) * 8;
          return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="4.5" fill="#fce0ed" opacity="0.85" transform={`rotate(${a},${cx},${cy})`}/>;
        })}
        <circle cx="0" cy="0" r="4.5" fill="#f0b0ca" opacity="0.72"/>
        <circle cx="0" cy="0" r="2.2" fill="#d890b0" opacity="0.62"/>
      </g>
      {/* Small white 5-petal flowers */}
      {[[110,96],[44,72],[154,84],[96,142],[62,50]].map(([fx,fy],idx) => (
        <g key={idx} transform={`translate(${fx},${fy})`}>
          {[0,72,144,216,288].map((a, i) => {
            const rad = a * Math.PI / 180;
            const px = Math.cos(rad)*6.5, py = Math.sin(rad)*6.5;
            return <ellipse key={i} cx={px} cy={py} rx="5" ry="3.2" fill="#fff8fb" opacity="0.9" transform={`rotate(${a},${px},${py})`}/>;
          })}
          <circle cx="0" cy="0" r="2.8" fill="#f8e068" opacity="0.88"/>
        </g>
      ))}
      {/* Sparkle dots */}
      <circle cx="102" cy="114" r="1.8" fill="#c8e0d0" opacity="0.82"/>
      <circle cx="58" cy="92" r="1.4" fill="#d8eed8" opacity="0.72"/>
      <circle cx="148" cy="66" r="1.5" fill="#c8e0d0" opacity="0.74"/>
      <circle cx="22" cy="146" r="1.2" fill="#d0ecd8" opacity="0.65"/>
    </svg>
  );
}

function RibbonBow() {
  return (
    <svg viewBox="0 0 110 44" className="w-28 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M55,22 C46,12 24,6 12,15 C3,23 15,34 28,29 C40,25 50,23 55,22Z" fill="#5a8a6a" opacity="0.78"/>
      <path d="M55,22 C48,15 30,10 18,16 C10,22 19,30 30,27 C41,24 50,22 55,22Z" fill="#4a7858" opacity="0.48"/>
      <path d="M55,22 C64,12 86,6 98,15 C107,23 95,34 82,29 C70,25 60,23 55,22Z" fill="#5a8a6a" opacity="0.78"/>
      <path d="M55,22 C62,15 80,10 92,16 C100,22 91,30 80,27 C69,24 60,22 55,22Z" fill="#4a7858" opacity="0.48"/>
      <ellipse cx="55" cy="22" rx="5.5" ry="4.8" fill="#3d6b52" opacity="0.92"/>
      <ellipse cx="55" cy="22" rx="3" ry="2.6" fill="#5a8a6a" opacity="0.7"/>
      <path d="M51,25 C48,30 46,37 48,42 C51,44 54,40 55,36Z" fill="#6a9a78" opacity="0.7"/>
      <path d="M59,25 C62,30 64,37 62,42 C59,44 56,40 55,36Z" fill="#6a9a78" opacity="0.7"/>
    </svg>
  );
}

function OrnamentStar() {
  return (
    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 inline-block flex-shrink-0" fill="none" stroke="#a97e1f" strokeWidth="1.2">
      <path d="M10 1L11.5 8.5L19 10L11.5 11.5L10 19L8.5 11.5L1 10L8.5 8.5Z"/>
    </svg>
  );
}

export default function Calendar() {
  const { t } = useLang();
  const c = t.calendar;

  const d = new Date(WEDDING_DATE);
  const year = d.getFullYear();
  const month = d.getMonth();
  const highlight = d.getDate();

  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: firstOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const weddingDayIdx = (new Date(year, month, highlight).getDay() + 6) % 7;
  const weddingDayName = (c.dayNames || c.weekdays)[weddingDayIdx];

  return (
    <section id="calendar" className="section flex-col py-24 bg-panel">
      <Reveal variant="flip" className="w-full max-w-xs sm:max-w-sm px-3 sm:px-4">
        <div
          className="relative rounded-[2rem] overflow-hidden"
          style={{
            background: 'linear-gradient(172deg,#fefaf6 0%,#fdf5ee 55%,#faf0e6 100%)',
            boxShadow: '0 28px 80px rgba(43,53,46,0.14),0 4px 24px rgba(169,126,31,0.1)',
            border: '1px solid rgba(169,126,31,0.18)',
          }}
        >
          {/* ── Flower strip ── */}
          <div className="relative h-40 sm:h-44 overflow-visible">
            <div className="absolute inset-0 bg-gradient-to-b from-[#eef5ef]/55 to-transparent pointer-events-none"/>
            <div className="absolute -top-4 -left-6 w-[58%] h-56 pointer-events-none">
              <FloralCorner flip={false}/>
            </div>
            <div className="absolute -top-4 -right-6 w-[58%] h-56 pointer-events-none">
              <FloralCorner flip={true}/>
            </div>
            <div className="absolute top-2 inset-x-0 flex justify-center pointer-events-none">
              <RibbonBow/>
            </div>
          </div>

          {/* ── Calendar body ── */}
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4 -mt-1">
              <OrnamentStar/>
              <p className="font-display text-lg sm:text-xl tracking-[0.14em] text-emerald-ink uppercase">
                {c.months[month]}, {year}
              </p>
              <OrnamentStar/>
            </div>

            <div className="grid grid-cols-7 text-center">
              {c.weekdays.map((w) => (
                <div key={w} className="text-[0.56rem] sm:text-[0.6rem] uppercase tracking-wide font-bold py-1.5" style={{color:'var(--emerald-soft)'}}>
                  {w}
                </div>
              ))}
            </div>

            <div className="gold-rule w-full mb-1.5"/>

            <div className="grid grid-cols-7 text-center">
              {cells.map((day, i) => {
                const isHL = day === highlight;
                const col = i % 7;
                const isWeekend = col === 5 || col === 6;
                return (
                  <div key={i} className="flex items-center justify-center py-[2.5px]">
                    {day ? (
                      <motion.div
                        className={[
                          'w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full',
                          'text-[0.7rem] sm:text-[0.78rem] select-none',
                          isHL
                            ? 'font-bold text-white ring-2 ring-[#c69b3a]/65 shadow-[0_4px_18px_rgba(11,61,46,0.45)]'
                            : isWeekend
                              ? 'bg-[#efe9d8] text-[#a97e1f] font-medium'
                              : 'bg-[#f4efe4] text-[#3a4a40]',
                        ].join(' ')}
                        style={isHL ? {background:'var(--emerald)'} : {}}
                        {...(isHL && {
                          animate: {
                            scale:[1,1.13,1],
                            boxShadow:['0 4px 18px rgba(11,61,46,0.42)','0 6px 28px rgba(11,61,46,0.68)','0 4px 18px rgba(11,61,46,0.42)'],
                          },
                          transition:{duration:2.2,repeat:Infinity,ease:'easeInOut'},
                        })}
                      >
                        {isHL ? (
                          <span className="relative leading-none">
                            {day}
                            <span className="absolute leading-none" style={{top:'-10px',right:'-7px',color:'#e6c877',fontSize:'9px'}}>✦</span>
                          </span>
                        ) : day}
                      </motion.div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="gold-rule w-full mt-3"/>

            <div className="flex items-center justify-center gap-2 mt-3 mb-0.5">
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#a97e1f" strokeWidth="1.1">
                <circle cx="10" cy="10" r="8.5"/><path d="M10 2L11.4 8.2L18 10L11.4 11.8L10 18L8.6 11.8L2 10L8.6 8.2Z"/>
              </svg>
              <p className="font-display tracking-[0.2em] uppercase" style={{color:'var(--gold-deep)',fontSize:'0.66rem'}}>
                {weddingDayName} · {highlight}-{c.months[month]}
              </p>
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#a97e1f" strokeWidth="1.1">
                <circle cx="10" cy="10" r="8.5"/><path d="M10 2L11.4 8.2L18 10L11.4 11.8L10 18L8.6 11.8L2 10L8.6 8.2Z"/>
              </svg>
            </div>
          </div>

          {/* Corner ornaments */}
          <span className="absolute leading-none select-none" style={{bottom:'10px',left:'12px',color:'#c69b3a',fontSize:'15px',opacity:0.58}}>+</span>
          <span className="absolute leading-none select-none" style={{bottom:'10px',right:'12px',color:'#c69b3a',fontSize:'15px',opacity:0.58}}>+</span>
          <span className="absolute leading-none select-none" style={{top:'168px',left:'8px',color:'#c69b3a',fontSize:'10px',opacity:0.42}}>✦</span>
          <span className="absolute leading-none select-none" style={{top:'168px',right:'8px',color:'#c69b3a',fontSize:'10px',opacity:0.42}}>✦</span>
        </div>
      </Reveal>
    </section>
  );
}
