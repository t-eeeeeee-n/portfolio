'use client';

import { useEffect, useState } from 'react';
import { ThemeButton } from '@/components/sections/ThemeButton';
import { BrandMark } from '@/components/ui/BrandMark';
import { Menu, X } from '@/components/ui/icons';

const SECTION_IDS = [
  'home',
  'projects',
  'lab',
  'notes',
  'about',
  'career',
  'skills',
  'contact',
] as const;

const LINKS: Array<[(typeof SECTION_IDS)[number], string]> = [
  ['projects', 'Projects'],
  ['lab', 'Lab'],
  ['notes', 'Notes'],
  ['about', 'About'],
  ['career', 'Career'],
  ['contact', 'Contact'],
];

export function Nav() {
  const [active, setActive] = useState<string>('home');
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Detect zone (light if center is over a .zone-light element)
      const cy = window.innerHeight / 2;
      const el = document.elementFromPoint(window.innerWidth / 2, cy);
      const zone = el?.closest('.zone-light, .zone-dark');
      setLight(zone?.classList.contains('zone-light') ?? false);

      // Active section: the last section whose top has scrolled past 100px
      let cur: string = 'home';
      for (const id of SECTION_IDS) {
        const sec = document.getElementById(id);
        if (sec && sec.getBoundingClientRect().top < 100) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <nav className={'nav' + (light ? ' nav-light' : '')}>
        <a href="#home" className="nav-logo" aria-label="teeeen.lab — home">
          <BrandMark size={22} decorative />
          <span className="nav-link-hide-mobile">teeeen.lab</span>
        </a>
        <div className="nav-links">
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={'nav-link' + (active === id ? ' is-active' : '')}
            >
              {label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="nav-mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
        <ThemeButton />
      </nav>

      {open && (
        <div
          className="nav-drawer-backdrop"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className={'nav-drawer' + (light ? ' nav-light' : '')}
            onClick={(e) => e.stopPropagation()}
          >
            {LINKS.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={'nav-drawer-link' + (active === id ? ' is-active' : '')}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
