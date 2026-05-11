'use client';

import { useEffect, useState } from 'react';
import { Sliders, X } from '@/components/ui/icons';

type Theme = 'dark' | 'paper' | 'light';
type Accent = '#ec5e2a' | '#f59e0b' | '#dc2626' | '#18181b';

const STORAGE_KEY = 'teeeen.tweaks';

type Tweaks = {
  theme: Theme;
  accent: Accent;
  bgMotion: boolean;
};

const DEFAULTS: Tweaks = {
  theme: 'dark',
  accent: '#ec5e2a',
  bgMotion: true,
};

const ACCENT_OPTIONS: Accent[] = ['#ec5e2a', '#f59e0b', '#dc2626', '#18181b'];

function applyAccent(hex: string) {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  document.documentElement.style.setProperty('--accent', hex);
  document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
}

function applyTweaks(t: Tweaks) {
  document.body.dataset.theme = t.theme;
  document.body.dataset.bgMotion = t.bgMotion ? 'on' : 'off';
  applyAccent(t.accent);
}

export function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Tweaks>;
        setTweaks({ ...DEFAULTS, ...parsed });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  function update<K extends keyof Tweaks>(key: K, value: Tweaks[K]) {
    const next = { ...tweaks, [key]: value };
    setTweaks(next);
    applyTweaks(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  if (!hydrated) return null;

  return (
    <>
      <button
        type="button"
        className="tweaks-fab"
        aria-label={open ? 'Close tweaks panel' : 'Open tweaks panel'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={16} /> : <Sliders size={16} />}
      </button>
      {open && (
        <div className="tweaks-panel" role="dialog" aria-label="Site tweaks">
          <div className="tweaks-section">Theme</div>
          <div className="tweaks-row">
            <span className="tweaks-row-label">Background</span>
            <div className="tweaks-radio-group">
              {(['dark', 'paper', 'light'] as Theme[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  className={'tweaks-radio' + (tweaks.theme === t ? ' is-active' : '')}
                  onClick={() => update('theme', t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-section">Accent</div>
          <div className="tweaks-color-row">
            {ACCENT_OPTIONS.map((c) => (
              <button
                type="button"
                key={c}
                aria-label={`Accent ${c}`}
                className={'tweaks-color-swatch' + (tweaks.accent === c ? ' is-active' : '')}
                style={{ background: c }}
                onClick={() => update('accent', c)}
              />
            ))}
          </div>

          <div className="tweaks-section">Motion</div>
          <div className="tweaks-row">
            <span className="tweaks-row-label">Background motion</span>
            <button
              type="button"
              role="switch"
              aria-checked={tweaks.bgMotion}
              className={'tweaks-toggle' + (tweaks.bgMotion ? ' is-on' : '')}
              onClick={() => update('bgMotion', !tweaks.bgMotion)}
            />
          </div>
        </div>
      )}
    </>
  );
}
