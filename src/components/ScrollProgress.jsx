import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Gold scroll-progress bar at the top of the page.
export default function ScrollProgress() {
  const barRef = useRef();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.18,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9998] h-[2.5px] pointer-events-none"
      style={{ background: 'rgba(169,126,31,0.1)' }}
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0"
        style={{
          background: 'linear-gradient(90deg,#9a7420,#c69b3a 30%,#e6c877 50%,#c69b3a 70%,#9a7420)',
          boxShadow: '0 0 10px rgba(198,155,58,0.65), 0 0 4px rgba(230,200,119,0.5)',
        }}
      />
    </div>
  );
}
