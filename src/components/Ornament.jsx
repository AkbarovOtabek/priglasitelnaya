// Набор переиспользуемых исламских орнаментов (чистый SVG).

export function StarBurst({ className = '', stroke = '#d4af37', spin = false }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} ${spin ? 'animate-spin-slow' : ''}`}
      fill="none"
      stroke={stroke}
      strokeWidth="1"
    >
      <g opacity="0.9">
        {/* 8-конечная звезда (rub el hizb) */}
        <rect x="55" y="55" width="90" height="90" transform="rotate(45 100 100)" />
        <rect x="55" y="55" width="90" height="90" />
        <circle cx="100" cy="100" r="70" opacity="0.4" />
        <circle cx="100" cy="100" r="48" opacity="0.6" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 48}
              y1={100 + Math.sin(a) * 48}
              x2={100 + Math.cos(a) * 70}
              y2={100 + Math.sin(a) * 70}
              opacity="0.5"
            />
          );
        })}
      </g>
    </svg>
  );
}

export function ArabesqueBorder({ className = '', stroke = '#d4af37' }) {
  return (
    <svg viewBox="0 0 1200 40" className={className} preserveAspectRatio="none" fill="none">
      <defs>
        <pattern id="arab" width="80" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M0 20 Q 20 0 40 20 T 80 20 M0 20 Q 20 40 40 20 T 80 20"
            stroke={stroke}
            strokeWidth="1"
            opacity="0.7"
          />
          <circle cx="40" cy="20" r="3" fill={stroke} opacity="0.8" />
        </pattern>
      </defs>
      <rect width="1200" height="40" fill="url(#arab)" />
    </svg>
  );
}

// Декоративная арка/михраб.
export function Arch({ className = '', stroke = '#d4af37' }) {
  return (
    <svg viewBox="0 0 200 300" className={className} fill="none" stroke={stroke} strokeWidth="1.2">
      <path d="M20 300 V120 Q20 20 100 20 Q180 20 180 120 V300" opacity="0.8" />
      <path d="M35 300 V125 Q35 40 100 40 Q165 40 165 125 V300" opacity="0.5" />
      <path d="M100 40 L100 20 M92 30 L108 30" opacity="0.7" />
      <circle cx="100" cy="14" r="5" opacity="0.9" />
    </svg>
  );
}

export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="gold-rule w-16 md:w-28" />
      <svg viewBox="0 0 40 40" className="w-6 h-6 text-gold" fill="none" stroke="currentColor">
        <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" strokeWidth="1" />
        <circle cx="20" cy="20" r="3" strokeWidth="1" />
      </svg>
      <span className="gold-rule w-16 md:w-28" />
    </div>
  );
}
