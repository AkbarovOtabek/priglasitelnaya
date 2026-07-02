import { useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import { motion } from 'framer-motion';
import trackUrl from '../123.mp3';

// Плавающая кнопка play/pause с canvas-визуализацией звуковой волны.
export default function MusicPlayer({ autostart }) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const howlRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const howl = new Howl({
      src: [trackUrl],
      loop: true,
      volume: 0,
      html5: false,
      onload: () => setReady(true),
    });
    howlRef.current = howl;
    return () => {
      howl.unload();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Автостарт после открытия приглашения (требует жеста — вызывается из Hero CTA).
  useEffect(() => {
    if (autostart && ready && !playing) toggle(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autostart, ready]);

  const setupAnalyser = () => {
    if (analyserRef.current) return;
    try {
      const ctx = Howler.ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      Howler.masterGain.connect(analyser);
      analyserRef.current = analyser;
      drawWave();
    } catch (e) {
      /* WebAudio недоступен — просто без визуализации */
    }
  };

  const drawWave = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext('2d');
    const data = new Uint8Array(analyser.frequencyBinCount);

    const render = () => {
      analyser.getByteFrequencyData(data);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 20;
      const step = Math.floor(data.length / bars);
      for (let i = 0; i < bars; i++) {
        const v = data[i * step] / 255;
        const h = Math.max(2, v * canvas.height);
        const x = (i / bars) * canvas.width;
        ctx.fillStyle = `rgba(169,126,31,${0.45 + v * 0.55})`;
        ctx.fillRect(x, (canvas.height - h) / 2, canvas.width / bars - 1.5, h);
      }
      rafRef.current = requestAnimationFrame(render);
    };
    render();
  };

  const toggle = (forceOn) => {
    const howl = howlRef.current;
    if (!howl) return;
    const next = forceOn ?? !playing;
    if (next) {
      if (Howler.ctx && Howler.ctx.state === 'suspended') Howler.ctx.resume();
      howl.play();
      howl.fade(0, 0.55, 1200);
      setupAnalyser();
    } else {
      howl.fade(howl.volume(), 0, 600);
      setTimeout(() => howl.pause(), 600);
      cancelAnimationFrame(rafRef.current);
    }
    setPlaying(next);
  };

  return (
    <motion.button
      onClick={() => toggle()}
      className="fixed bottom-5 right-5 z-[900] flex items-center gap-2 glass rounded-full pl-3 pr-4 py-2 interactive"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-label="music toggle"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gold/50">
        {playing ? (
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gold-deep">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-gold-deep">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </span>
      <canvas ref={canvasRef} width={64} height={22} className="h-[22px] w-16" />
    </motion.button>
  );
}
