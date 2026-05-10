'use client';

import { useEffect } from 'react';

/* Single global client effect that orchestrates:
   - Spotlight position (--mx / --my CSS vars on body) for .bg-fx-spotlight
   - Scroll parallax (--scroll-y CSS var) for .bg-fx-mesh
   - Scroll reveal (IntersectionObserver toggling .is-revealed on
     [data-reveal] / .reveal-child)
   - Magnetic CTA hover (translate towards the cursor)

   Stays a no-op on touch devices for the mouse-driven pieces, and
   honors prefers-reduced-motion for everything except the harmless
   spotlight var update (which doesn't actually animate anything). */
export function Effects() {
  useEffect(() => {
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = matchMedia('(pointer: coarse)').matches;

    /* ── mouse → spotlight position ────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--mx', `${x}%`);
      document.body.style.setProperty('--my', `${y}%`);
    };
    if (!isTouch) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }

    /* ── scroll → mesh parallax var ────────────────────────────── */
    const onScroll = () => {
      document.body.style.setProperty('--scroll-y', String(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── IntersectionObserver: scroll reveal ───────────────────── */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) {
            ent.target.classList.add('is-revealed');
            io.unobserve(ent.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const staggerChildren: HTMLElement[] = [];
    revealEls.forEach((el) => {
      if (prefersReduced) {
        el.classList.add('is-revealed');
        return;
      }
      const mode = el.getAttribute('data-reveal');
      if (mode === 'stagger') {
        Array.from(el.children).forEach((c, i) => {
          const child = c as HTMLElement;
          child.classList.add('reveal-child');
          child.style.setProperty('--reveal-delay', `${i * 60}ms`);
          io.observe(child);
          staggerChildren.push(child);
        });
        return;
      }
      io.observe(el);
    });

    /* ── magnetic CTA buttons ──────────────────────────────────── */
    type Magnetic = {
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    };
    const magnetics: Magnetic[] = [];
    if (!isTouch && !prefersReduced) {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
      els.forEach((el) => {
        const strength = parseFloat(el.dataset.magnetic ?? '0.2') || 0.2;
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = (e.clientX - cx) * strength;
          const dy = (e.clientY - cy) * strength;
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        };
        const leave = () => {
          el.style.transform = '';
        };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
        magnetics.push({ el, move, leave });
      });
    }

    return () => {
      if (!isTouch) window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      magnetics.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return null;
}
