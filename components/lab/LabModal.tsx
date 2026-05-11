'use client';

import { useEffect } from 'react';
import { X } from '@/components/ui/icons';
import type { LabEntry } from '@/lib/lab-catalog';

type Tab = 'preview' | 'code' | 'props' | 'notes';

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
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const Render = c.Render;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
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
          <div
            className="eyebrow"
            style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span>{c.cat} · Component</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '2px 6px',
                borderRadius: 4,
                color:
                  c.status === 'shipped'
                    ? 'var(--accent)'
                    : 'var(--l-text-3)',
                border:
                  c.status === 'shipped'
                    ? '1px solid rgba(var(--accent-rgb), 0.5)'
                    : '1px solid var(--l-line)',
              }}
              title={
                c.status === 'shipped'
                  ? 'Shipped in production'
                  : 'Pattern — not yet productionized'
              }
            >
              {c.status === 'shipped' ? 'shipped' : 'pattern'}
            </span>
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
              <p style={{ fontSize: 13, color: 'var(--l-text-1)', lineHeight: 1.6, margin: 0 }}>
                {c.useCase}
              </p>
            </div>
          )}
          {tab === 'code' && (
            <pre className="code" style={{ margin: 0, whiteSpace: 'pre' }}>
              {c.code}
            </pre>
          )}
          {tab === 'props' && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              {c.propsRows.map(([name, type, def], i) => (
                <div
                  key={name + i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr',
                    gap: 12,
                    padding: '10px 0',
                    borderTop: '1px solid var(--l-line)',
                  }}
                >
                  <span style={{ color: 'var(--l-text-0)' }}>{name}</span>
                  <div>
                    <div
                      style={{
                        color: 'var(--accent)',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {type}
                    </div>
                    <div style={{ color: 'var(--l-text-2)', fontSize: 11, marginTop: 2 }}>
                      {def}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'notes' && (
            <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--l-text-1)' }}>
              <div style={{ marginBottom: 18 }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>
                  Design Note
                </div>
                {c.notes}
              </div>
              {c.related.length > 0 && (
                <div>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>
                    Related
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {c.related.map((r) => (
                      <span key={r} className="tag">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Source attribution / pattern indicator pinned to bottom */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 14,
              borderTop: '1px dashed var(--l-line)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              color: 'var(--l-text-3)',
              letterSpacing: '0.02em',
            }}
          >
            {c.status === 'shipped' && c.source ? (
              <>↳ source · {c.source}</>
            ) : (
              <>↳ pattern · まだ本実装はしていない設計</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export type { Tab };
