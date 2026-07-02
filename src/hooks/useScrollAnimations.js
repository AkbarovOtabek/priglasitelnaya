import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useScrollAnimations(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const setupId = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── 1. Gold shimmer sweep across each section ─────────────
        document.querySelectorAll('.section').forEach((section) => {
          const sweep = document.createElement('div');
          Object.assign(sweep.style, {
            position: 'absolute', inset: '0',
            pointerEvents: 'none', zIndex: '2',
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
                x: '230%', duration: 1.8, ease: 'power2.out',
                onComplete: () => { try { sweep.remove(); } catch (_) {} },
              });
            },
          });
        });

        // ── 2. Glass cards: alternate left/right slide-in ────────
        document.querySelectorAll('.glass').forEach((el, i) => {
          const fromX = i % 2 === 0 ? -55 : 55;
          gsap.fromTo(el,
            { x: fromX, opacity: 0, scale: 0.94 },
            { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            }
          );
        });

        // ── 3. Eyebrow lines fade+rise ───────────────────────────
        document.querySelectorAll('.section .eyebrow').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 22, letterSpacing: '0.02em' },
            { opacity: 1, y: 0, letterSpacing: '0.06em', duration: 1.0, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            }
          );
        });

        // ── 4. Parallax on [data-parallax] elements ──────────────
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.22;
          gsap.to(el, {
            y: `${speed * 110}px`, ease: 'none',
            scrollTrigger: {
              trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.6,
            },
          });
        });

        // ── 5. Section dividers: expand from center ───────────────
        document.querySelectorAll('.gold-rule').forEach((el) => {
          gsap.fromTo(el,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 1.1, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 90%', once: true }
            }
          );
        });

        // ── 6. Hero section: subtle scale on scroll-out ──────────
        const hero = document.getElementById('hero');
        if (hero) {
          gsap.to(hero, {
            scale: 0.96, opacity: 0.6, ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
          });
        }

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 1600);

    return () => clearTimeout(setupId);
  }, [enabled]);
}
