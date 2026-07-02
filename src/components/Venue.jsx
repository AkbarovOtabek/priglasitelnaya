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
              // Плейсхолдер: сюда добавляется видео ресторана
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-gold/40">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-white animate-float">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-gold-deep">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <p className="font-display text-xl text-emerald-ink">{v.videoTitle}</p>
                <p className="text-ink-soft text-sm px-6 max-w-sm">{v.videoHint}</p>
                <code className="text-[0.7rem] text-gold-deep bg-ink/5 px-3 py-1 rounded">
                  /public/restaurant.mp4 → VENUE.video
                </code>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
