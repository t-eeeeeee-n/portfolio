/* Hero right-side constellation — 5 floating mini panels.
   Pure server component; animations are CSS-only and respect
   prefers-reduced-motion / data-bg-motion="off". */

const priceRows = [
  { name: 'ヤマハ', price: '¥298', best: true },
  { name: 'イオン', price: '¥318' },
  { name: 'ライフ', price: '¥328' },
  { name: 'サミット', price: '¥348' },
];

const traceRows: [string, string][] = [
  ['12:04:01', '→ POST /spec'],
  ['12:04:01', '↳ planner'],
  ['12:04:02', '↳ designer'],
  ['12:04:03', '← 200 OK'],
];

const pipelineRows = [
  { name: 'Planner', pct: 100, ok: true },
  { name: 'Designer', pct: 78, ok: true },
  { name: 'Linter', pct: 42, ok: false },
];

export function FloatingDeck() {
  return (
    <div className="floating-deck">
      {/* 1. Price Comparison */}
      <div className="fp fp-1">
        <div className="fp-h">
          <span className="fp-h-dot" /> price · 4店
        </div>
        <div className="fp-b">
          {priceRows.map((r) => (
            <div className="fp-row" key={r.name}>
              <span className="fp-label">{r.name}</span>
              <span className={'fp-val' + (r.best ? ' fp-val-accent' : '')}>
                {r.price}
                {r.best ? ' ↓' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Trace Log */}
      <div className="fp fp-2">
        <div className="fp-h">
          <span className="fp-h-dot" /> trace
        </div>
        <div
          className="fp-b"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, lineHeight: 1.7 }}
        >
          {traceRows.map(([t, msg], i) => (
            <div key={i} style={{ display: 'flex', gap: 8, color: 'var(--d-text-2)' }}>
              <span style={{ color: 'var(--d-text-3)' }}>{t}</span>
              <span style={{ color: 'var(--d-text-1)' }}>{msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Agent Pipeline */}
      <div className="fp fp-3">
        <div className="fp-h">
          <span className="fp-h-dot" /> agent · pipeline
        </div>
        <div className="fp-b" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pipelineRows.map((r, i) => (
            <div key={r.name}>
              <div className="fp-row" style={{ padding: 0 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="fp-pill fp-pill-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="fp-label">{r.name}</span>
                </span>
                <span className="fp-val">{r.pct}%</span>
              </div>
              <div className="fp-bar">
                <div
                  className="fp-bar-fill"
                  style={{ width: r.pct + '%', opacity: r.ok ? 1 : 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Component Preview */}
      <div className="fp fp-4">
        <div className="fp-h">
          <span className="fp-h-dot" /> component
        </div>
        <div className="fp-b" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 1, background: 'var(--d-line-2)' }} />
          <div style={{ display: 'flex', gap: 6 }}>
            <span className="fp-pill fp-pill-accent">Active</span>
            <span className="fp-pill">Draft</span>
            <span className="fp-pill">Review</span>
          </div>
          <div className="fp-row" style={{ padding: 0 }}>
            <span className="fp-label">Toggle</span>
            <span
              style={{
                width: 28,
                height: 16,
                borderRadius: 999,
                background: 'var(--accent)',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  right: 2,
                  top: 2,
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: '#fff',
                }}
              />
            </span>
          </div>
        </div>
      </div>

      {/* 5. Code Snippet */}
      <div className="fp fp-5">
        <div className="fp-h">
          <span className="fp-h-dot" /> handler.ts
        </div>
        <div className="fp-b">
          <div className="fp-code">
            <div>
              <span className="fp-code-c">{'// price/normalize'}</span>
            </div>
            <div>
              <span className="fp-code-k">export const</span> norm = (raws) =&gt;
            </div>
            <div>&nbsp;&nbsp;raws.map(r =&gt; (&#123;</div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;sku: <span className="fp-code-k">canon</span>(r.name),
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;jpy: <span className="fp-code-k">parseInt</span>(r.price)
            </div>
            <div>&nbsp;&nbsp;&#125;));</div>
          </div>
        </div>
      </div>
    </div>
  );
}
