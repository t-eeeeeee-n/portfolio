'use client';

import { useEffect, useState } from 'react';
import { Box, Check, Clock, Search, Spark } from '@/components/ui/icons';

/* ============================================================
   Demo primitives
   ============================================================ */

type DemoBtnProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'accent';
  size?: 'sm' | 'md';
  onClick?: () => void;
};

function DemoBtn({ children, variant = 'primary', size = 'md', onClick }: DemoBtnProps) {
  const sizes: Record<NonNullable<DemoBtnProps['size']>, React.CSSProperties> = {
    md: { padding: '9px 16px', fontSize: 13 },
    sm: { padding: '6px 12px', fontSize: 12 },
  };
  const variants: Record<NonNullable<DemoBtnProps['variant']>, React.CSSProperties> = {
    primary: { background: '#0a0a0c', color: '#fff', border: '1px solid #0a0a0c' },
    ghost: {
      background: 'transparent',
      color: 'var(--l-text-0)',
      border: '1px solid var(--l-line)',
    },
    accent: { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' },
  };
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...sizes[size],
        ...variants[variant],
        borderRadius: 8,
        fontWeight: 500,
        letterSpacing: '-0.005em',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {children}
    </button>
  );
}

function DemoSwitch({ on: forced, onChange }: { on?: boolean; onChange?: (v: boolean) => void }) {
  const [on, setOn] = useState(forced ?? false);
  useEffect(() => {
    if (forced !== undefined) setOn(forced);
  }, [forced]);
  return (
    <button
      type="button"
      onClick={() => {
        setOn(!on);
        onChange?.(!on);
      }}
      style={{
        width: 38,
        height: 22,
        borderRadius: 999,
        background: on ? 'var(--accent)' : '#d4d2c5',
        position: 'relative',
        transition: 'background 0.18s',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: on ? 18 : 2,
          width: 18,
          height: 18,
          borderRadius: 999,
          background: '#fff',
          transition: 'left 0.18s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }}
      />
    </button>
  );
}

/* ============================================================
   UI category
   ============================================================ */

export function PreviewButton() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
      <DemoBtn>Submit</DemoBtn>
      <DemoBtn variant="ghost">Cancel</DemoBtn>
      <DemoBtn variant="accent">
        <Spark size={12} stroke="#fff" /> Generate
      </DemoBtn>
    </div>
  );
}

export function PreviewBadge() {
  const badges: Array<{ l: string; c: string }> = [
    { l: 'running', c: '#7c5cff' },
    { l: 'queued', c: '#71717a' },
    { l: 'ok', c: '#16a34a' },
    { l: 'failed', c: '#dc2626' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      {badges.map((b) => (
        <span
          key={b.l}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.02em',
            padding: '3px 9px',
            borderRadius: 999,
            background: b.c + '1a',
            color: b.c,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: 999,
              background: b.c,
              display: 'inline-block',
            }}
          />
          {b.l}
        </span>
      ))}
    </div>
  );
}

export function PreviewKpi() {
  const items: Array<{ l: string; v: string; d: string }> = [
    { l: 'MRR', v: '¥1,240k', d: '+12.4%' },
    { l: 'Active', v: '382', d: '+24' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%' }}>
      {items.map((k) => (
        <div
          key={k.l}
          style={{
            background: 'var(--l-bg-0)',
            border: '1px solid var(--l-line)',
            borderRadius: 10,
            padding: '12px 14px',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: 'var(--l-text-2)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {k.l}
          </div>
          <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4, letterSpacing: '-0.01em' }}>
            {k.v}
          </div>
          <div
            style={{
              fontSize: 10,
              color: '#16a34a',
              fontFamily: 'var(--font-mono)',
              marginTop: 2,
            }}
          >
            ↑ {k.d}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PreviewToast() {
  return (
    <div
      style={{
        background: '#0a0a0c',
        color: '#fff',
        padding: '11px 14px',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 13,
        boxShadow: '0 12px 30px -10px rgba(0,0,0,0.25)',
        minWidth: 220,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          background: 'rgba(196,245,66,0.18)',
          color: 'var(--accent-2)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Check size={11} stroke="var(--accent-2)" />
      </span>
      Saved to draft
      <span
        style={{
          marginLeft: 'auto',
          fontSize: 11,
          color: '#a1a1aa',
          fontFamily: 'var(--font-mono)',
        }}
      >
        ⌘Z
      </span>
    </div>
  );
}

export function PreviewTabs() {
  const tabs = ['preview', 'code', 'props'] as const;
  const [t, setT] = useState<(typeof tabs)[number]>('preview');
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid var(--l-line)' }}>
        {tabs.map((x) => (
          <button
            type="button"
            key={x}
            onClick={() => setT(x)}
            style={{
              padding: '8px 12px',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: t === x ? 'var(--l-text-0)' : 'var(--l-text-2)',
              borderBottom: `2px solid ${t === x ? 'var(--l-text-0)' : 'transparent'}`,
              marginBottom: -1,
            }}
          >
            {x}
          </button>
        ))}
      </div>
      <div
        style={{
          padding: 16,
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--l-text-2)',
        }}
      >
        {t} content
      </div>
    </div>
  );
}

export function PreviewModal() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 140 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,10,12,0.4)',
          borderRadius: 8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          right: 18,
          bottom: 18,
          background: 'var(--l-bg-0)',
          border: '1px solid var(--l-line)',
          borderRadius: 10,
          padding: 14,
          fontSize: 12,
          boxShadow: '0 12px 30px -10px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ fontWeight: 500, marginBottom: 6 }}>削除しますか?</div>
        <div style={{ color: 'var(--l-text-2)', fontSize: 11, marginBottom: 12 }}>
          この操作は取り消せません
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <DemoBtn variant="ghost" size="sm">
            Cancel
          </DemoBtn>
          <DemoBtn variant="primary" size="sm">
            Delete
          </DemoBtn>
        </div>
      </div>
    </div>
  );
}

export function PreviewForm() {
  return (
    <div style={{ width: '100%' }}>
      <label style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--l-text-2)' }}>
        email
      </label>
      <div
        style={{
          background: 'var(--l-bg-0)',
          border: '1px solid var(--l-line)',
          borderRadius: 8,
          padding: '8px 10px',
          fontSize: 12,
          marginTop: 4,
          color: 'var(--l-text-2)',
        }}
      >
        you@example.com
      </div>
      <div
        style={{ fontSize: 10, color: '#dc2626', marginTop: 4, fontFamily: 'var(--font-mono)' }}
      >
        ↳ format invalid
      </div>
    </div>
  );
}

export function PreviewEmpty() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        color: 'var(--l-text-2)',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'var(--l-bg-2)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Box size={16} stroke="var(--l-text-3)" />
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--l-text-0)' }}>
        結果がありません
      </div>
      <div style={{ fontSize: 11 }}>条件を変えてもう一度お試しください</div>
    </div>
  );
}

/* ============================================================
   Product category
   ============================================================ */

export function PreviewSearch() {
  return (
    <div
      style={{
        background: 'var(--l-bg-0)',
        border: '1px solid var(--l-line)',
        borderRadius: 10,
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
      }}
    >
      <Search size={14} stroke="var(--l-text-2)" />
      <span style={{ flex: 1, fontSize: 13, color: 'var(--l-text-2)' }}>商品名で検索…</span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--l-text-3)',
          padding: '2px 6px',
          border: '1px solid var(--l-line)',
          borderRadius: 4,
        }}
      >
        ⌘K
      </span>
    </div>
  );
}

export function PreviewPriceCmp() {
  const rows: Array<[string, string, boolean?]> = [
    ['オオゼキ', '¥198', true],
    ['業務スーパー', '¥218'],
    ['ライフ', '¥248'],
  ];
  return (
    <div
      style={{
        background: 'var(--l-bg-0)',
        border: '1px solid var(--l-line)',
        borderRadius: 10,
        width: '100%',
        overflow: 'hidden',
        fontSize: 12,
      }}
    >
      <div
        style={{
          padding: '10px 12px',
          borderBottom: '1px solid var(--l-line-2)',
          fontWeight: 500,
        }}
      >
        たまご 10個
      </div>
      {rows.map((r, i) => (
        <div
          key={r[0]}
          style={{
            display: 'flex',
            padding: '8px 12px',
            borderTop: i ? '1px solid var(--l-line-2)' : '1px solid var(--l-line-2)',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: 999,
              background: r[2] ? 'var(--accent)' : '#ccc',
              marginRight: 8,
              display: 'inline-block',
            }}
          />
          <span style={{ flex: 1 }}>{r[0]}</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              color: r[2] ? 'var(--accent)' : 'var(--l-text-1)',
              fontWeight: 500,
            }}
          >
            {r[1]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PreviewStepper() {
  const steps = ['plan', 'diff', 'verify'] as const;
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontFamily: 'var(--font-mono)' }}
    >
      {steps.map((s, i) => (
        <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 999,
              background: i <= 1 ? 'var(--accent)' : 'var(--l-bg-0)',
              color: i <= 1 ? '#fff' : 'var(--l-text-2)',
              border: i <= 1 ? '1px solid var(--accent)' : '1px solid var(--l-line)',
            }}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span style={{ width: 12, height: 1, background: 'var(--l-line)' }} />
          )}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   AI category
   ============================================================ */

export function PreviewAgentPipeline() {
  const labels = ['A', 'B', 'C', 'D'];
  return (
    <svg viewBox="0 0 100 50" style={{ width: '100%', maxWidth: 220 }}>
      <g stroke="var(--l-text-3)" strokeWidth="0.4" fill="none" strokeDasharray="1.5 1">
        <path d="M 14 25 L 32 25" />
        <path d="M 44 25 L 62 25" />
        <path d="M 74 25 L 86 25" />
      </g>
      {labels.map((l, i) => (
        <g key={l} transform={`translate(${8 + i * 30}, 25)`}>
          <rect
            x="-6"
            y="-4"
            width="12"
            height="8"
            rx="1.5"
            fill={i === 1 ? 'rgba(124,92,255,0.12)' : 'var(--l-bg-0)'}
            stroke={i === 1 ? 'var(--accent)' : 'var(--l-line)'}
            strokeWidth="0.3"
          />
          <text
            x="0"
            y="1.2"
            textAnchor="middle"
            fontSize="3.2"
            fill="var(--l-text-0)"
            fontFamily="JetBrains Mono"
          >
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function PreviewPromptCard() {
  return (
    <div
      style={{
        background: 'var(--l-bg-0)',
        border: '1px solid var(--l-line)',
        borderRadius: 10,
        padding: 14,
        width: '100%',
        fontSize: 12,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--l-text-2)',
          marginBottom: 8,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>claude-sonnet-4 · 1.2s</span>
        <span style={{ color: 'var(--accent)' }}>● done</span>
      </div>
      <div style={{ color: 'var(--l-text-1)', lineHeight: 1.5 }}>
        議事録から
        <span
          style={{ background: 'rgba(124,92,255,0.18)', padding: '0 3px', borderRadius: 3 }}
        >
          14件
        </span>
        の未決事項を抽出しました。
      </div>
    </div>
  );
}

export function PreviewApproval() {
  return (
    <div
      style={{
        background: 'var(--l-bg-0)',
        border: '1px solid var(--l-line)',
        borderRadius: 10,
        padding: 14,
        width: '100%',
      }}
    >
      <div style={{ fontSize: 12, marginBottom: 8 }}>承認が必要です</div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--l-text-2)',
          marginBottom: 10,
          fontFamily: 'var(--font-mono)',
        }}
      >
        schedule.swap(slot_3, slot_5)
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <DemoBtn variant="accent" size="sm">
          <Check size={11} stroke="#fff" /> Approve
        </DemoBtn>
        <DemoBtn variant="ghost" size="sm">
          Reject
        </DemoBtn>
      </div>
    </div>
  );
}

export function PreviewDiff() {
  return (
    <div
      style={{
        background: 'var(--l-bg-0)',
        border: '1px solid var(--l-line)',
        borderRadius: 10,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '6px 10px',
          background: 'rgba(220,38,38,0.05)',
          color: '#dc2626',
          borderLeft: '2px solid #dc2626',
        }}
      >
        - spec.coverage = 0.74
      </div>
      <div
        style={{
          padding: '6px 10px',
          background: 'rgba(22,163,74,0.05)',
          color: '#16a34a',
          borderLeft: '2px solid #16a34a',
        }}
      >
        + spec.coverage = 0.86
      </div>
    </div>
  );
}

export function PreviewVerify() {
  const rows: Array<[string, boolean]> = [
    ['schema valid', true],
    ['constraints', true],
    ['spec coverage > 80%', true],
    ['security review', false],
  ];
  return (
    <div
      style={{
        background: 'var(--l-bg-0)',
        border: '1px solid var(--l-line)',
        borderRadius: 10,
        width: '100%',
        padding: 12,
      }}
    >
      {rows.map(([label, ok]) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 0',
            fontSize: 12,
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: ok ? 'rgba(22,163,74,0.15)' : 'rgba(251,191,36,0.15)',
              color: ok ? '#16a34a' : '#d97706',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {ok ? (
              <Check size={9} stroke="#16a34a" />
            ) : (
              <Clock size={9} stroke="#d97706" />
            )}
          </span>
          <span style={{ color: ok ? 'var(--l-text-0)' : 'var(--l-text-2)' }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function PreviewTrace() {
  const rows: Array<[string, string, string]> = [
    ['00.12', 'main', 'plan'],
    ['00.34', 'sub.a', 'diff'],
    ['00.51', 'verify', 'ok'],
  ];
  return (
    <div
      style={{
        width: '100%',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        background: 'var(--l-bg-0)',
        border: '1px solid var(--l-line)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {rows.map((r, i) => (
        <div
          key={r[0]}
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 50px 1fr',
            gap: 6,
            padding: '5px 8px',
            borderTop: i ? '1px solid var(--l-line-2)' : 0,
          }}
        >
          <span style={{ color: 'var(--l-text-3)' }}>{r[0]}</span>
          <span style={{ color: 'var(--accent)' }}>{r[1]}</span>
          <span>{r[2]}</span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Architecture category
   ============================================================ */

export function PreviewArch() {
  return (
    <svg viewBox="0 0 100 60" style={{ width: '100%', maxWidth: 220 }}>
      <g fontFamily="JetBrains Mono" fontSize="3" fill="var(--l-text-1)" textAnchor="middle">
        <rect x="6" y="6" width="28" height="14" rx="2" fill="var(--l-bg-0)" stroke="var(--l-line)" strokeWidth="0.3" />
        <text x="20" y="14.5">Next.js</text>
        <rect x="38" y="6" width="28" height="14" rx="2" fill="var(--l-bg-0)" stroke="var(--l-line)" strokeWidth="0.3" />
        <text x="52" y="14.5">Hono API</text>
        <rect x="70" y="6" width="24" height="14" rx="2" fill="rgba(124,92,255,0.1)" stroke="var(--accent)" strokeWidth="0.3" />
        <text x="82" y="14.5" fill="var(--accent)">Claude</text>
        <rect x="22" y="38" width="24" height="14" rx="2" fill="var(--l-bg-0)" stroke="var(--l-line)" strokeWidth="0.3" />
        <text x="34" y="46.5">Postgres</text>
        <rect x="54" y="38" width="24" height="14" rx="2" fill="var(--l-bg-0)" stroke="var(--l-line)" strokeWidth="0.3" />
        <text x="66" y="46.5">Cloud Run</text>
      </g>
      <g stroke="var(--l-text-3)" strokeWidth="0.3" fill="none" strokeDasharray="1 1">
        <path d="M 34 20 L 34 38" />
        <path d="M 52 20 L 52 38 M 52 20 L 80 6 M 66 38 L 80 20" />
      </g>
    </svg>
  );
}

export function PreviewToggle() {
  return <DemoSwitch on={true} />;
}
