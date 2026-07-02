import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Adds GSAP-powered section entrance effects:
// • Gold shimmer sweep across each section as it enters the viewport
// • Subtle parallax on elements with [data-parallax] attribute
export function useScrollAnimations(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    // Delay slightly so lazy-loaded sections are mounted
    const setupId = setTimeout(() => {
      const ctx = gsap.context(() => {
        // ── Gold light sweep ───────────────────────────────────────
        document.querySelectorAll('.section').forEach((section) => {
          const sweep = document.createElement('div');
          Object.assign(sweep.style, {
            position: 'absolute',
            inset: '0',
            pointerEvents: 'none',
            zIndex: '2',
            background:
              'linear-gradient(108deg,transparent 0%,rgba(230,200,119,0.09) 42%,rgba(255,245,180,0.16) 50%,rgba(230,200,119,0.09) 58%,transparent 100%)',
            transform: 'translateX(-115%)',
            willChange: 'transform',
          });
          section.appendChild(sweep);

          ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.to(sweep, {
                x: '230%',
                duration: 1.8,
                ease: 'power2.out',
                onComplete: () => {
                  try { sweep.remove(); } catch (_) { /* ignore */ }
                },
              });
            },
          });
        });

        // ── Parallax on [data-parallax] elements ──────────────────
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.22;
          gsap.to(el, {
            y: `${speed * 110}px`,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          });
        });

        // ── Section heading letter-spacing breathe ────────────────
        document.querySelectorAll('.section h2.text-gold-gradient').forEach((h2) => {
          gsap.fromTo(
            h2,
            { letterSpacing: '0.02em' },
            {
              letterSpacing: '0.08em',
              ease: 'none',
              scrollTrigger: {
                trigger: h2,
                start: 'top 75%',
                end: 'top 30%',
                scrub: 2,
              },
            }
          );
        });

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 1600);

    return () => clearTimeout(setupId);
  }, [enabled]);
}
