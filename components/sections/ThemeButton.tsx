'use client';

import { Moon, Sun } from '@/components/ui/icons';
import { useTweaks } from '@/lib/tweaks';

/* Quick light/dark switch lives in the Nav. Cycles between dark and
   light (the in-between "paper" theme stays accessible via the
   bottom-right Tweaks panel for anyone who wants the warm grey
   variant). Reads/writes the same tweaks state as TweaksPanel so the
   two stay in sync when both are visible. */
export function ThemeButton() {
  const { tweaks, update, hydrated } = useTweaks();
  if (!hydrated) return null;

  const isLight = tweaks.theme === 'light';
  const next = isLight ? 'dark' : 'light';

  return (
    <button
      type="button"
      className="nav-theme-toggle"
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'ダーク表示' : 'ライト表示'}
      onClick={() => update('theme', next)}
    >
      {isLight ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
