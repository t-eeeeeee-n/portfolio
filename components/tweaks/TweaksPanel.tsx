'use client';

import { useState } from 'react';
import { Sliders, X } from '@/components/ui/icons';
import { ACCENT_OPTIONS, useTweaks, type Accent, type Theme } from '@/lib/tweaks';

export function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const { tweaks, update, hydrated } = useTweaks();

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
                onClick={() => update('accent', c as Accent)}
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
