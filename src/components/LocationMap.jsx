import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Divider } from './Ornament';
import { Reveal } from './Reveal';
import { VENUE } from '../data/content';
import { useLang } from '../context/LanguageContext';

export default function LocationMap() {
  const { t } = useLang();
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Инициализируем карту (и грузим тайлы в память) только когда секция
    // приближается к экрану — иначе карта висит внизу и жрёт RAM/трафик впустую.
    const initMap = () => {
      if (mapRef.current) return;

      const map = L.map(container, {
        center: [VENUE.lat, VENUE.lng],
        zoom: 15,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      // Светлая карта (CARTO light) под кремовую тему.
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        maxZoom: 19,
      }).addTo(map);

      const goldPin = L.divIcon({
        className: '',
        html: `
          <div class="gold-pin" style="width:40px;height:52px;transform-origin:bottom center;">
            <svg viewBox="0 0 40 52" width="40" height="52">
              <path d="M20 0C9 0 0 9 0 20c0 14 20 32 20 32s20-18 20-32C40 9 31 0 20 0z"
                fill="#0b3d2e" stroke="#d4af37" stroke-width="2"/>
              <circle cx="20" cy="20" r="8" fill="#d4af37"/>
              <path d="M23 16a6 6 0 1 0 0 8 5 5 0 1 1 0-8z" fill="#04180f"/>
            </svg>
          </div>`,
        iconSize: [40, 52],
        iconAnchor: [20, 52],
      });

      L.marker([VENUE.lat, VENUE.lng], { icon: goldPin })
        .addTo(map)
        .bindPopup(`<b style="color:#0b3d2e">${t.location.subtitle}</b>`);

      // фикс размеров после появления секции
      setTimeout(() => map.invalidateSize(), 300);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initMap();
          io.disconnect();
        }
      },
      { rootMargin: '600px' }
    );
    io.observe(container);

    return () => {
      io.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="location" className="section flex-col py-24 bg-page">
      <Reveal className="text-center mb-12 px-6">
        <p className="eyebrow text-lg">{t.location.subtitle}</p>
        <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mt-2">{t.location.title}</h2>
        <Divider className="mt-6" />
      </Reveal>

      <Reveal delay={0.15} className="w-full max-w-4xl px-6">
        <div className="glass rounded-2xl p-2 overflow-hidden">
          <div ref={containerRef} className="h-[360px] md:h-[440px] w-full rounded-xl overflow-hidden" />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a href={VENUE.gmaps} target="_blank" rel="noreferrer" className="btn-gold interactive">
            Google Maps
          </a>
          <a href={VENUE.yandex} target="_blank" rel="noreferrer" className="btn-gold interactive">
            {t.location.route}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
