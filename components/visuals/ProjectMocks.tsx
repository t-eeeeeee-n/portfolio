import { Search } from '@/components/ui/icons';

/* ============================================================
   Project 01 — ヤスイミセ
   Compact price comparison list ported from
   tmp/portfolio/visuals.jsx YasuimiseMock.
   ============================================================ */

const YASUIMISE_STORES: Array<{ name: string; price: number; dist: string; best?: boolean }> = [
  { name: 'オオゼキ', price: 198, best: true, dist: '350m' },
  { name: '業務スーパー', price: 218, dist: '620m' },
  { name: 'ライフ', price: 248, dist: '1.1km' },
  { name: 'サミット', price: 268, dist: '900m' },
];

export function YasuimiseMock() {
  return (
    <div className="mini" style={{ width: '100%' }}>
      <div className="mini-card" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Search size={14} stroke="var(--d-text-2)" />
          <span
            style={{
              color: 'var(--d-text-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
            }}
          >
            &quot;国産 たまご 10個&quot;
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 11,
              color: 'var(--d-text-3)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            4 stores
          </span>
        </div>
      </div>
      <div className="mini-card" style={{ padding: 0 }}>
        <div
          style={{
            padding: '12px 14px',
            borderBottom: '1px dashed var(--d-line-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500 }}>国産 たまご 10個</span>
          <span className="tag" style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 6px' }}>
            price · ¥
          </span>
        </div>
        {YASUIMISE_STORES.map((s, i) => (
          <div
            key={s.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderBottom: i < YASUIMISE_STORES.length - 1 ? '1px solid var(--d-line-2)' : 0,
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: 999,
                background: s.best ? 'var(--accent-2)' : 'var(--d-text-3)',
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: 12 }}>{s.name}</span>
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--d-text-3)',
              }}
            >
              {s.dist}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: s.best ? 'var(--accent-2)' : 'var(--d-text-1)',
                fontWeight: 500,
                width: 56,
                textAlign: 'right',
              }}
            >
              ¥{s.price}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          display: 'flex',
          gap: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--d-text-3)',
        }}
      >
        <span>↳ Gemini OCR · 解析中</span>
        <span style={{ marginLeft: 'auto' }}>updated 14:32</span>
      </div>
    </div>
  );
}

/* ============================================================
   Project 02 — SpecPilot
   Agent pipeline diagram (SVG) + KPI grid.
   ============================================================ */

const SPECPILOT_NODES: Array<{
  x: number;
  y: number;
  label: string;
  sub: string;
  muted?: boolean;
  emit?: boolean;
}> = [
  { x: 8, y: 22, label: '議事録', sub: 'input.md', muted: true },
  { x: 38, y: 8, label: 'Extractor', sub: 'Claude' },
  { x: 38, y: 38, label: 'Question', sub: 'GPT-4o' },
  { x: 68, y: 22, label: 'Designer', sub: 'Claude' },
  { x: 92, y: 22, label: 'Vibe Pack', sub: 'output', emit: true },
];

export function SpecPilotMock() {
  return (
    <div className="mini" style={{ width: '100%' }}>
      <div className="mock-window">
        <div className="mock-window-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span
            style={{
              marginLeft: 6,
              color: 'var(--d-text-3)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            specpilot.flow
          </span>
        </div>
        <div className="mock-window-body" style={{ padding: 16 }}>
          <svg viewBox="0 0 100 50" style={{ width: '100%', height: 160 }}>
            {/* edges */}
            <g
              stroke="rgba(var(--accent-rgb), 0.5)"
              strokeWidth="0.4"
              fill="none"
              strokeDasharray="1.5 1"
            >
              <path d="M 14 22 L 34 10" />
              <path d="M 14 24 L 34 38" />
              <path d="M 44 10 L 64 21" />
              <path d="M 44 38 L 64 24" />
              <path d="M 74 22 L 88 22" />
            </g>
            {/* nodes */}
            {SPECPILOT_NODES.map((n) => (
              <g key={n.label} transform={`translate(${n.x}, ${n.y})`}>
                <rect
                  x="-6"
                  y="-3.5"
                  width="12"
                  height="7"
                  rx="1.2"
                  fill={
                    n.emit
                      ? 'rgba(196,245,66,0.12)'
                      : n.muted
                        ? 'var(--d-bg-2)'
                        : 'rgba(var(--accent-rgb), 0.12)'
                  }
                  stroke={
                    n.emit
                      ? 'rgba(196,245,66,0.6)'
                      : n.muted
                        ? 'var(--d-line)'
                        : 'rgba(var(--accent-rgb), 0.5)'
                  }
                  strokeWidth="0.25"
                />
                <text
                  x="0"
                  y="-0.4"
                  textAnchor="middle"
                  fontSize="2.4"
                  fill="var(--d-text-0)"
                  fontFamily="Inter"
                >
                  {n.label}
                </text>
                <text
                  x="0"
                  y="2.3"
                  textAnchor="middle"
                  fontSize="1.7"
                  fill="var(--d-text-3)"
                  fontFamily="JetBrains Mono"
                >
                  {n.sub}
                </text>
              </g>
            ))}
          </svg>
          <div
            style={{
              display: 'flex',
              gap: 6,
              fontSize: 10,
              color: 'var(--d-text-3)',
              marginTop: 4,
            }}
          >
            <span style={{ color: 'var(--accent-2)' }}>● running</span>
            <span style={{ marginLeft: 'auto' }}>4 agents · trace_id 9f2…</span>
          </div>
        </div>
      </div>
      <div className="kpi-grid" style={{ marginTop: 10 }}>
        <div className="kpi-card">
          <div className="kpi-label">questions</div>
          <div className="kpi-value">14</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">spec coverage</div>
          <div className="kpi-value">
            86<span style={{ fontSize: 11, color: 'var(--d-text-3)' }}>%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Project 03 — CMスポット枠 自動編集支援エージェント (PoC)
   Trace log viewer with Main + 6 Sub agents, A2A, trace_id tags.
   ============================================================ */

const CM_AGENT_TRACES: Array<{
  t: string;
  agent: string;
  evt: string;
  ok?: boolean;
  warn?: boolean;
  em?: boolean;
}> = [
  { t: '00.12', agent: 'main', evt: 'PLAN: 6スロット最適化', ok: true },
  { t: '00.34', agent: 'schedule', evt: 'DIFF: 3 → 5 swap', ok: true },
  { t: '00.51', agent: 'fairness', evt: 'constraint check', ok: true },
  { t: '01.04', agent: 'verify', evt: 'VERIFICATION', ok: true, em: true },
  { t: '01.18', agent: 'main', evt: 'human approval req', warn: true },
];

export function CmAgentMock() {
  return (
    <div className="mini">
      <div className="mock-window">
        <div className="mock-window-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span
            style={{
              marginLeft: 6,
              color: 'var(--d-text-3)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            trace · 9f2-a1c
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-2)',
              fontSize: 10,
            }}
          >
            ● live
          </span>
        </div>
        <div className="mock-window-body" style={{ padding: 0 }}>
          {CM_AGENT_TRACES.map((tr, i) => (
            <div
              key={tr.t}
              style={{
                display: 'grid',
                gridTemplateColumns: '44px 80px 1fr 22px',
                gap: 8,
                padding: '9px 14px',
                borderTop: i > 0 ? '1px solid var(--d-line-2)' : 0,
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                background: tr.em ? 'rgba(var(--accent-rgb), 0.06)' : 'transparent',
              }}
            >
              <span style={{ color: 'var(--d-text-3)' }}>{tr.t}</span>
              <span style={{ color: 'var(--d-text-1)' }}>{tr.agent}</span>
              <span style={{ color: 'var(--d-text-0)' }}>{tr.evt}</span>
              <span
                style={{
                  color: tr.warn
                    ? '#fbbf24'
                    : tr.ok
                      ? 'var(--accent-2)'
                      : 'var(--d-text-3)',
                }}
              >
                {tr.warn ? '?' : '✓'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        <span className="tag">
          <span className="tag-dot" />
          Main + 6 Sub
        </span>
        <span className="tag">A2A</span>
        <span className="tag">trace_id</span>
      </div>
    </div>
  );
}
