// Elegant interlocking wedding rings (pure SVG, gold gradient + sparkle).
export default function RingsSVG({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 220 130"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      fill="none"
    >
      <defs>
        <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f6dd8f" />
          <stop offset="45%" stopColor="#c69b3a" />
          <stop offset="100%" stopColor="#9a7420" />
        </linearGradient>
        <linearGradient id="ringGold2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f9e6a8" />
          <stop offset="50%" stopColor="#d4af4f" />
          <stop offset="100%" stopColor="#a97e1f" />
        </linearGradient>
        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4d472" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f4d472" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft glow */}
      <ellipse cx="110" cy="66" rx="105" ry="60" fill="url(#ringGlow)" />

      {/* Left ring (bride) */}
      <circle cx="88" cy="70" r="38" stroke="url(#ringGold)" strokeWidth="9" />
      <circle cx="88" cy="70" r="38" stroke="#fff8e6" strokeWidth="1.4" opacity="0.55" />
      {/* highlight arc */}
      <path d="M 60 46 A 38 38 0 0 1 96 34" stroke="#fff8e6" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />

      {/* Right ring (groom), interlocking */}
      <circle cx="134" cy="70" r="38" stroke="url(#ringGold2)" strokeWidth="9" />
      <circle cx="134" cy="70" r="38" stroke="#fff8e6" strokeWidth="1.4" opacity="0.5" />
      <path d="M 152 102 A 38 38 0 0 1 116 106" stroke="#fff8e6" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />

      {/* Overlap: re-draw a small arc of the left ring so it weaves over the right */}
      <path
        d="M 118 44 A 38 38 0 0 1 118 96"
        stroke="url(#ringGold)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Diamond on the left ring */}
      <g transform="translate(88, 30)">
        <path d="M 0 -9 L 7 -2 L 0 9 L -7 -2 Z" fill="#eaf6ff" opacity="0.95" />
        <path d="M 0 -9 L 7 -2 L 0 -2 Z" fill="#ffffff" opacity="0.9" />
        <path d="M -7 -2 L 0 -2 L 0 9 Z" fill="#bfe0f5" opacity="0.85" />
        <path d="M 7 -2 L 0 -2 L 0 9 Z" fill="#9fcbe8" opacity="0.85" />
      </g>

      {/* Sparkles */}
      <g fill="#fff3cf">
        <path d="M 176 34 l 1.6 5 5 1.6 -5 1.6 -1.6 5 -1.6 -5 -5 -1.6 5 -1.6 z" opacity="0.85" />
        <path d="M 40 96 l 1.2 3.6 3.6 1.2 -3.6 1.2 -1.2 3.6 -1.2 -3.6 -3.6 -1.2 3.6 -1.2 z" opacity="0.7" />
      </g>
    </svg>
  );
}
