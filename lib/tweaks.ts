'use client';

import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'paper' | 'light';
export type Accent = '#ec5e2a' | '#f59e0b' | '#dc2626' | '#18181b';

export type Tweaks = {
  theme: Theme;
  accent: Accent;
  bgMotion: boolean;
};

export const DEFAULTS: Tweaks = {
  theme: 'dark',
  accent: '#ec5e2a',
  bgMotion: true,
};

export const ACCENT_OPTIONS: readonly Accent[] = ['#ec5e2a', '#f59e0b', '#dc2626', '#18181b'];

export const STORAGE_KEY = 'teeeen.tweaks';
const CHANGE_EVENT = 'teeeen-tweaks-changed';

export function readTweaks(): Tweaks {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Tweaks>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

function writeStorage(t: Tweaks): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  } catch {
    /* ignore */
  }
}

export function applyTweaks(t: Tweaks): void {
  if (typeof document === 'undefined') return;
  document.body.dataset.theme = t.theme;
  document.body.dataset.bgMotion = t.bgMotion ? 'on' : 'off';
  const hex = t.accent.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  document.documentElement.style.setProperty('--accent', t.accent);
  document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
}

/** Persist + broadcast. Other useTweaks() subscribers in the page get
 *  the new state via a same-tab custom event. */
export function commitTweaks(t: Tweaks): void {
  applyTweaks(t);
  writeStorage(t);
  window.dispatchEvent(new CustomEvent<Tweaks>(CHANGE_EVENT, { detail: t }));
}

export function useTweaks() {
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTweaks(readTweaks());
    setHydrated(true);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<Tweaks>).detail;
      if (detail) setTweaks(detail);
    };
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  function update<K extends keyof Tweaks>(key: K, value: Tweaks[K]) {
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    commitTweaks(next);
  }

  return { tweaks, update, hydrated };
}
