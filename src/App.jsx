import { useState, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import LanguageToggle from './components/LanguageToggle';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import EnvelopeGate from './components/Envelope';
import Particles from './components/Particles';
import ScrollProgress from './components/ScrollProgress';
import { StarBurst } from './components/Ornament';

// Тяжёлые секции грузим лениво.
const LoveAnimation = lazy(() => import('./components/LoveAnimation'));
const Ceremony = lazy(() => import('./components/Ceremony'));
const WeddingDivider = lazy(() => import('./components/WeddingDivider'));
const Calendar = lazy(() => import('./components/Calendar'));
const Venue = lazy(() => import('./components/Venue'));
const LocationMap = lazy(() => import('./components/LocationMap'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <StarBurst className="w-16 h-16 opacity-60" spin />
    </div>
  );
}

function Shell() {
  const [loaded, setLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  useSmoothScroll(entered);
  useScrollAnimations(entered);

  const enter = () => {
    setEntered(true);
    setMusicOn(true);
    // Гарантированно начинаем с hero после «входа».
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      window.__lenis?.scrollTo(0, { immediate: true });
    });
  };

  const scrollNext = () => {
    const el = document.getElementById('love');
    if (window.__lenis && el) window.__lenis.scrollTo(el, { duration: 1.6 });
    else el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      {/* Конверт сам проигрывает анимацию открытия и убирается через AnimatePresence */}
      {loaded && <EnvelopeGate onEnter={enter} />}

      {/* Конфетти + лепестки + фейерверки */}
      {entered && <Particles />}
      {/* Золотая полоска прогресса прокрутки */}
      {entered && <ScrollProgress />}

      <CustomCursor />
      <LanguageToggle />
      <MusicPlayer autostart={musicOn} />

      <main className={loaded ? 'opacity-100' : 'opacity-0'}>
        <Hero onScrollNext={scrollNext} />

        <Suspense fallback={<SectionFallback />}>
          <LoveAnimation />
          <Ceremony />
          <WeddingDivider />
          <Calendar />
          <Venue />
          <LocationMap />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  );
}
