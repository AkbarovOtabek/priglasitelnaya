// Inline SVG cartoon couple illustration (bride + groom, chibi style)
export default function CoupleSVG({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 300 360"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Soft background glow */}
      <defs>
        <radialGradient id="coupleGlow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#fef5ee" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#fef5ee" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="200" rx="148" ry="175" fill="url(#coupleGlow)"/>

      {/* ── BRIDE (left side) ── */}
      {/* Full skirt */}
      <path d="M 42 358 C 14 338 10 278 26 218 L 50 212 L 100 212 L 116 218 C 128 278 120 338 88 358 Z" fill="#f9f9f9"/>
      <path d="M 30 350 C 38 310 44 270 52 238 M 90 358 C 88 318 87 278 100 242" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1.5"/>
      {/* Dress bodice */}
      <path d="M 53 212 L 50 182 L 65 175 L 82 175 L 98 182 L 100 212 Z" fill="#ffffff"/>
      {/* Dress neckline curve */}
      <path d="M 62 178 Q 73 183 85 178" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
      {/* Veil */}
      <path d="M 52 152 C 30 164 26 196 28 234" fill="none" stroke="rgba(240,240,240,0.95)" strokeWidth="9" strokeLinecap="round"/>
      <path d="M 52 152 C 33 168 31 200 35 238" fill="none" stroke="rgba(210,210,210,0.5)" strokeWidth="4" strokeLinecap="round"/>

      {/* Bride head */}
      <circle cx="74" cy="148" r="29" fill="#f5c8a8"/>
      {/* Hair — dark updo */}
      <ellipse cx="74" cy="128" rx="22" ry="16" fill="#362010"/>
      <ellipse cx="74" cy="119" rx="16" ry="11" fill="#362010"/>
      <circle cx="87" cy="121" r="10" fill="#362010"/>
      {/* White flowers hair decorations */}
      {[0, 65, 130, 195, 260].map((a, i) => {
        const rad = a * Math.PI / 180;
        return (
          <g key={i}>
            {[0,72,144,216,288].map((pa, pi) => {
              const pr = pa * Math.PI/180;
              return <ellipse key={pi} cx={87 + Math.cos(rad)*10 + Math.cos(pr)*5} cy={121 + Math.sin(rad)*10 + Math.sin(pr)*5} rx="3.5" ry="2.2" fill="white" opacity="0.95"/>;
            })}
            <circle cx={87 + Math.cos(rad)*10} cy={121 + Math.sin(rad)*10} r="1.8" fill="#f5e060"/>
          </g>
        );
      })}
      {/* Bride eyes */}
      <circle cx="64" cy="150" r="5.8" fill="#1a0a00"/>
      <circle cx="84" cy="150" r="5.8" fill="#1a0a00"/>
      <circle cx="66" cy="148" r="2.2" fill="white"/>
      <circle cx="86" cy="148" r="2.2" fill="white"/>
      {/* Eye lashes */}
      {[-4,-1,2].map((dx,i)=><line key={i} x1={64+dx} y1={145} x2={62+dx} y2={141} stroke="#362010" strokeWidth="1.2" strokeLinecap="round"/>)}
      {[-4,-1,2].map((dx,i)=><line key={i} x1={84+dx} y1={145} x2={82+dx} y2={141} stroke="#362010" strokeWidth="1.2" strokeLinecap="round"/>)}
      {/* Blush */}
      <ellipse cx="57" cy="158" rx="7" ry="4.5" fill="#f8a8a0" opacity="0.35"/>
      <ellipse cx="91" cy="158" rx="7" ry="4.5" fill="#f8a8a0" opacity="0.35"/>
      {/* Bride smile */}
      <path d="M 65 163 Q 74 170 83 163" fill="none" stroke="#c87860" strokeWidth="2" strokeLinecap="round"/>

      {/* Bouquet */}
      <path d="M 96 218 Q 112 228 112 250" stroke="#4a8040" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M 102 214 Q 116 224 118 244" stroke="#4a8040" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      {[[110,230],[118,222],[123,232],[113,240],[124,242]].map(([fx,fy],i)=>(
        <g key={i}>
          {[0,72,144,216,288].map((a,pi)=>{const r=a*Math.PI/180;return<ellipse key={pi} cx={fx+Math.cos(r)*6} cy={fy+Math.sin(r)*6} rx="5" ry="3" fill="white" opacity="0.95" transform={`rotate(${a} ${fx+Math.cos(r)*6} ${fy+Math.sin(r)*6})`}/>;})}
          <circle cx={fx} cy={fy} r="3" fill="#f5e060"/>
        </g>
      ))}
      <ellipse cx="120" cy="248" rx="9" ry="5" fill="#5a9050" opacity="0.85" transform="rotate(-22 120 248)"/>
      <ellipse cx="106" cy="250" rx="8" ry="4.5" fill="#5a9050" opacity="0.8" transform="rotate(18 106 250)"/>

      {/* ── GROOM (right side) ── */}
      {/* Trousers */}
      <rect x="190" y="275" width="55" height="83" rx="5" fill="#16162a"/>
      {/* Suit body */}
      <path d="M 178 192 L 174 275 L 245 275 L 242 192 Z" fill="#16162a"/>
      {/* White shirt front */}
      <path d="M 208 192 L 204 224 L 208 232 L 212 224 L 208 192 Z" fill="#f5f5f5"/>
      {[198,204,211,218].map((sy,i)=>(
        <circle key={i} cx={208} cy={sy} r="1.5" fill="rgba(0,0,0,0.18)"/>
      ))}
      {/* Bow tie */}
      <path d="M 200 204 L 208 210 L 216 204 L 208 202 Z" fill="#16162a"/>
      <path d="M 200 218 L 208 210 L 216 218 L 208 220 Z" fill="#16162a"/>
      <circle cx="208" cy="210" r="4" fill="#22223a"/>
      {/* Lapels */}
      <path d="M 208 192 L 193 214 L 200 226 Z" fill="#22223a"/>
      <path d="M 208 192 L 223 214 L 216 226 Z" fill="#22223a"/>
      {/* Boutonniere */}
      {[0,72,144,216,288].map((a,i)=>{const r=a*Math.PI/180;return<ellipse key={i} cx={188+Math.cos(r)*6} cy={212+Math.sin(r)*6} rx="5" ry="3" fill="white" opacity="0.92" transform={`rotate(${a} ${188+Math.cos(r)*6} ${212+Math.sin(r)*6})`}/>;})}
      <circle cx="188" cy="212" r="2.5" fill="#f5e060"/>

      {/* Groom head */}
      <circle cx="208" cy="162" r="31" fill="#d4a070"/>
      {/* Curly hair */}
      <path d="M 178 156 Q 180 136 186 141 Q 188 128 195 132 Q 197 122 204 126 Q 207 119 214 123 Q 219 118 225 126 Q 230 131 232 142 Q 235 152 232 162 L 178 162 Z" fill="#362010"/>
      {[180,188,196,204,212,220,228].map((hx,i)=>(
        <circle key={i} cx={hx} cy={i===0?157:i===1?153:i===2?151:i===3?150:i===4?151:i===5?154:158} r="8" fill="#362010"/>
      ))}
      {/* Groom eyes */}
      <circle cx="197" cy="164" r="6" fill="#1a0a00"/>
      <circle cx="218" cy="164" r="6" fill="#1a0a00"/>
      <circle cx="199" cy="162" r="2.2" fill="white"/>
      <circle cx="220" cy="162" r="2.2" fill="white"/>
      {/* Eyebrows */}
      <path d="M 190 155 Q 197 151 204 154" fill="none" stroke="#362010" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M 212 154 Q 219 151 226 155" fill="none" stroke="#362010" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Blush */}
      <ellipse cx="190" cy="174" rx="7.5" ry="4.5" fill="#c8906a" opacity="0.38"/>
      <ellipse cx="226" cy="174" rx="7.5" ry="4.5" fill="#c8906a" opacity="0.38"/>
      {/* Open happy smile */}
      <path d="M 197 177 Q 208 186 218 177" fill="white"/>
      <path d="M 197 177 Q 208 186 218 177" fill="none" stroke="#c87860" strokeWidth="1.8" strokeLinecap="round"/>

      {/* ── Floating hearts ── */}
      <text x="118" y="90" fontSize="22" fill="#e87090" opacity="0.9">♡</text>
      <text x="150" y="74" fontSize="28" fill="#e87090" opacity="0.95">♡</text>
      <text x="183" y="86" fontSize="20" fill="#e87090" opacity="0.85">♡</text>
      <text x="98" y="104" fontSize="15" fill="#e87090" opacity="0.6">♡</text>

      {/* ── Decorative sparkles ── */}
      <text x="35" y="108" fontSize="13" fill="#f0c878" opacity="0.55">✦</text>
      <text x="262" y="98" fontSize="11" fill="#f0c878" opacity="0.5">✦</text>
      <circle cx="28" cy="270" r="3" fill="#e87090" opacity="0.4"/>
      <circle cx="272" cy="280" r="3.5" fill="#e87090" opacity="0.35"/>
      <circle cx="38" cy="195" r="2.5" fill="#f0c878" opacity="0.45"/>
      <circle cx="268" cy="185" r="4" fill="#f0c878" opacity="0.38"/>
    </svg>
  );
}
