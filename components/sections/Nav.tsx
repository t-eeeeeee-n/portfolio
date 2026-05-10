'use client';

import { useEffect, useState } from 'react';

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

  return (
    <nav className={'nav' + (light ? ' nav-light' : '')}>
      <a href="#home" className="nav-logo">
        <span className="nav-logo-mark">t.n</span>
        <span className="nav-link-hide-mobile">teeeen.lab</span>
      </a>
      {LINKS.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={'nav-link' + (active === id ? ' is-active' : '')}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
