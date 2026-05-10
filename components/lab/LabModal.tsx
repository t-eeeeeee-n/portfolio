'use client';

import { useEffect } from 'react';
import { X } from '@/components/ui/icons';
import type { LabEntry } from '@/lib/lab-catalog';

type Tab = 'preview' | 'code' | 'props' | 'notes';

const PROPS_ROWS: Array<[string, string, string]> = [
  ['variant', '"primary" | "ghost" | "accent"', 'default value'],
  ['size', '"sm" | "md" | "lg"', '"md"'],
  ['loading', 'boolean', 'false'],
  ['onClick', '(e) => void', '—'],
];

function renderCodeSnippet(name: string) {
  const safe = name.replace(/\s/g, '');
  return `import { ${safe} } from "@/lab";

export function Example() {
  return (
    <${safe}
      variant="primary"
      onClick={() => console.log("clicked")}
    >
      Submit
    </${safe}>
  );
}`;
}

export function LabModal({
  c,
  tab,
  setTab,
  onClose,
}: {
  c: LabEntry;
  tab: Tab;
  setTab: (t: Tab) => void;
  onClose: () => void;
}) {
  // Escape key closes the modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const Render = c.Render;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`lab-modal-${c.id}-title`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-preview">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              width: 30,
              height: 30,
              borderRadius: 999,
              background: 'var(--l-bg-2)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <X size={14} />
          </button>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Render />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 14,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--l-text-3)',
            }}
          >
            preview · {c.id}
          </div>
        </div>
        <div className="modal-side">
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {c.cat} · Component
          </div>
          <h3
            id={`lab-modal-${c.id}-title`}
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: '-0.015em',
              margin: 0,
              marginBottom: 8,
            }}
          >
            {c.name}
          </h3>
          <p
            style={{
              fontSize: 13.5,
              color: 'var(--l-text-1)',
              lineHeight: 1.55,
              margin: 0,
              marginBottom: 18,
            }}
          >
            {c.desc}
          </p>

          <div className="modal-tabs">
            {(['preview', 'code', 'props', 'notes'] as Tab[]).map((t) => (
              <button
                type="button"
                key={t}
                className={'modal-tab' + (tab === t ? ' is-active' : '')}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'preview' && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                Use Case
              </div>
              <p style={{ fontSize: 13, color: 'var(--l-text-1)', lineHeight: 1.6 }}>
                ヤスイミセや SpecPilot で実際に使われる構成。Preview はこの Lab のライブインスタンスです。
              </p>
            </div>
          )}
          {tab === 'code' && (
            <pre className="code" style={{ margin: 0 }}>
              {renderCodeSnippet(c.name)}
            </pre>
          )}
          {tab === 'props' && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              {PROPS_ROWS.map(([k, t, d]) => (
                <div
                  key={k}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr',
                    gap: 12,
                    padding: '10px 0',
                    borderTop: '1px solid var(--l-line)',
                  }}
                >
                  <span style={{ color: 'var(--l-text-0)' }}>{k}</span>
                  <div>
                    <div style={{ color: 'var(--accent)' }}>{t}</div>
                    <div style={{ color: 'var(--l-text-2)', fontSize: 11, marginTop: 2 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'notes' && (
            <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--l-text-1)' }}>
              <div style={{ marginBottom: 14 }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>
                  Design Note
                </div>
                状態と見た目を一致させるため、props は単一の意味単位 (variant, state) に揃えています。色だけで状態を伝えないようにテキストやアイコンも併用。
              </div>
              <div style={{ marginBottom: 14 }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>
                  Accessibility
                </div>
                role / aria-* / focus-visible / キーボード操作を網羅。重要操作は <kbd>Enter</kbd> と <kbd>Space</kbd> に対応。
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>
                  Related
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span className="tag">ヤスイミセ</span>
                  <span className="tag">SpecPilot</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type { Tab };
