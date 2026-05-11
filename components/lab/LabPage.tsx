'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LabModal, type Tab } from '@/components/lab/LabModal';
import { BrandMark } from '@/components/ui/BrandMark';
import { labCatalog, labCategories, type LabEntry } from '@/lib/lab-catalog';

export function LabPage() {
  const [cat, setCat] = useState<(typeof labCategories)[number]>('All');
  const [open, setOpen] = useState<LabEntry | null>(null);
  const [tab, setTab] = useState<Tab>('preview');

  // open from hash on mount
  useEffect(() => {
    const h = window.location.hash.replace('#', '');
    if (h) {
      const c = labCatalog.find((x) => x.id === h);
      if (c) setOpen(c);
    }
  }, []);

  const list = cat === 'All' ? labCatalog : labCatalog.filter((c) => c.cat === cat);
  const counts: Record<(typeof labCategories)[number], number> = labCategories.reduce(
    (acc, c) => {
      acc[c] = c === 'All' ? labCatalog.length : labCatalog.filter((x) => x.cat === c).length;
      return acc;
    },
    {} as Record<(typeof labCategories)[number], number>,
  );

  return (
    <>
      {/* Top bar */}
      <header className="page-header">
        <div className="container flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[13px]"
            style={{ fontWeight: 550 }}
            aria-label="teeeen.lab — home"
          >
            <BrandMark size={22} decorative />
            <span>teeeen.lab</span>
            <span className="ml-2 font-mono text-[11px] text-l-text-3">/ component-lab</span>
          </Link>
          <span className="ml-auto font-mono text-xs text-l-text-2 flex items-center gap-2">
            <span
              className="pulse"
              style={{ background: 'var(--accent)' }}
              aria-hidden="true"
            />
            v.0.5 · {labCatalog.length} components
          </span>
          <Link
            href="/"
            className="btn btn-ghost"
            style={{ padding: '7px 14px', fontSize: 12 }}
          >
            ← Home
          </Link>
        </div>
      </header>

      <section className="zone-light" style={{ padding: '64px 0 24px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Component Lab · v0.5
          </div>
          <h1 className="h-section" style={{ maxWidth: 720, marginBottom: 16 }}>
            作って終わりにせず、
            <br />
            次の開発で使える形にしておく実験場。
          </h1>
          <p className="lede" style={{ maxWidth: 640 }}>
            UI コンポーネント・プロダクト構成要素・AI Agent 向け UI・設計パターンを、 実際の開発で使える形でまとめています。 各コンポーネントは Preview / Code / Props / Notes の 4 面で構成しています。
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 36 }}>
            {labCategories.map((c) => (
              <button
                type="button"
                key={c}
                className={'lab-cat-pill' + (cat === c ? ' is-active' : '')}
                onClick={() => setCat(c)}
              >
                {c}{' '}
                <span
                  style={{
                    color: cat === c ? 'rgba(255,255,255,0.6)' : 'var(--l-text-3)',
                  }}
                >
                  {counts[c]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="zone-light" style={{ padding: '16px 0 96px' }}>
        <div className="container">
          <div className="lab-grid">
            {list.map((c) => {
              const Render = c.Render;
              return (
                <div
                  key={c.id}
                  className="lab-cell"
                  style={{ gridColumn: `span ${c.span}` }}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setOpen(c);
                    setTab('preview');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpen(c);
                      setTab('preview');
                    }
                  }}
                >
                  <div className="lab-preview">
                    <Render />
                  </div>
                  <div className="lab-foot">
                    <div>
                      <div className="lab-name">{c.name}</div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'var(--l-text-2)',
                          marginTop: 2,
                          lineHeight: 1.4,
                        }}
                      >
                        {c.desc}
                      </div>
                    </div>
                    <span className="lab-cat" style={{ flexShrink: 0 }}>
                      {c.cat}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {open && (
        <LabModal c={open} tab={tab} setTab={setTab} onClose={() => setOpen(null)} />
      )}
    </>
  );
}
