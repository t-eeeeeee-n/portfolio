/* Temporary route for picking the new brand mark. Compares the 3
   candidate SVGs at favicon (16/22/32) / nav (22) / og-card (56) /
   apple-icon (96/180) sizes, on dark / paper / white backgrounds,
   inline vs inside the current orange container. Delete this route
   once a winner is chosen. */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Mark Preview',
  robots: { index: false, follow: false },
};

type MarkProps = { size?: number; color?: string };

function MarkA({ size = 32, color = 'currentColor' }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="teeeen.lab — Morse TN"
    >
      <rect x="5" y="9" width="22" height="3.5" rx="1.75" fill={color} />
      <rect x="5" y="19.5" width="14" height="3.5" rx="1.75" fill={color} />
      <circle cx="24" cy="21.25" r="2" fill={color} />
    </svg>
  );
}

function MarkB({ size = 32, color = 'currentColor' }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="teeeen.lab — Skeletal t·n"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M 8 6 V 26" />
      <path d="M 5 10 H 11" />
      <rect x="14.5" y="22.5" width="2.5" height="2.5" fill={color} stroke="none" />
      <path d="M 21 26 V 15 H 27 V 26" />
    </svg>
  );
}

function MarkC({ size = 32, color = 'currentColor' }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="teeeen.lab — Bracket dot"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M 11 6 H 7 V 26 H 11" />
      <circle cx="16" cy="16" r="2.5" fill={color} stroke="none" />
      <path d="M 21 6 H 25 V 26 H 21" />
    </svg>
  );
}

function CurrentMark({ size = 32 }: { size?: number }) {
  return (
    <span
      style={{
        display: 'inline-grid',
        placeItems: 'center',
        width: size,
        height: size,
        borderRadius: size * 0.27,
        background: 'linear-gradient(135deg, #ec5e2a, #c2451a 60%, #8a2f10)',
        color: '#fff',
        fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
        fontSize: size * 0.45,
        fontWeight: 600,
        letterSpacing: '-0.02em',
      }}
    >
      t.n
    </span>
  );
}

type MarkComp = (p: MarkProps) => JSX.Element;

const OPTIONS: Array<{ id: string; title: string; pitch: string; Mark: MarkComp }> = [
  {
    id: 'A',
    title: 'Option A — Morse TN',
    pitch: 'モールス符号で T = ━ と N = ━・ を 2 段に並べた。通信/信号ヘリテージ、最も distinctive。',
    Mark: MarkA,
  },
  {
    id: 'B',
    title: 'Option B — Skeletal t·n',
    pitch: '既存ブランド DNA を踏襲しつつ skeletal な geometric form に解体。安全策。',
    Mark: MarkB,
  },
  {
    id: 'C',
    title: 'Option C — Bracket dot [ · ]',
    pitch: 'コードブラケットで日本語中黒「・」を囲んだ形。シンメトリック。',
    Mark: MarkC,
  },
];

const ORANGE = '#ec5e2a';
const DARK = '#08080a';
const PAPER = '#ece9e0';
const WHITE = '#ffffff';

const sizes = [16, 22, 32, 48, 64, 96];

export default function MarksPreviewPage() {
  return (
    <main
      style={{
        background: DARK,
        color: '#f4f4f5',
        minHeight: '100vh',
        padding: '48px 32px',
        fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 500,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Brand Mark Preview
        </h1>
        <p style={{ color: '#a1a1aa', marginTop: 8, fontSize: 13, lineHeight: 1.6 }}>
          3 candidate marks side-by-side, plus the current mark for comparison.
          <br />
          Pick one and tell me the option letter (A / B / C / keep current).
        </p>

        {OPTIONS.map((opt) => (
          <section
            key={opt.id}
            style={{
              marginTop: 56,
              padding: 28,
              border: '1px solid #26262e',
              borderRadius: 14,
              background: '#0e0e12',
            }}
          >
            <header style={{ marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  margin: 0,
                  letterSpacing: '-0.015em',
                }}
              >
                {opt.title}
              </h2>
              <p style={{ color: '#a1a1aa', marginTop: 6, fontSize: 13, lineHeight: 1.6 }}>
                {opt.pitch}
              </p>
            </header>

            {/* Row 1: orange on transparent (default brand color) at all sizes */}
            <SectionLabel>Orange (#ec5e2a) — transparent / inline use</SectionLabel>
            <SizeRow Mark={opt.Mark} color={ORANGE} bg="transparent" />

            {/* Row 2: white on dark (theme-aware, currentColor) */}
            <SectionLabel>currentColor (white on dark — Nav inline)</SectionLabel>
            <SizeRow Mark={opt.Mark} color="#f4f4f5" bg="transparent" />

            {/* Row 3: 3 backgrounds at nav-mark size (22px) */}
            <SectionLabel>22px on different backgrounds</SectionLabel>
            <BackgroundRow Mark={opt.Mark} size={22} color={ORANGE} />

            {/* Row 4: apple-icon (180) preview */}
            <SectionLabel>Apple touch icon — 180px (3 styles)</SectionLabel>
            <AppleIconRow Mark={opt.Mark} />

            {/* Row 5: Nav simulation */}
            <SectionLabel>Nav capsule simulation</SectionLabel>
            <NavSimulation Mark={opt.Mark} />
          </section>
        ))}

        {/* Current mark for comparison */}
        <section
          style={{
            marginTop: 56,
            padding: 28,
            border: '1px dashed #444',
            borderRadius: 14,
            background: '#0e0e12',
            opacity: 0.85,
          }}
        >
          <header style={{ marginBottom: 28 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 500,
                margin: 0,
                letterSpacing: '-0.015em',
              }}
            >
              現状 — Orange box with &quot;t.n&quot; text
            </h2>
            <p style={{ color: '#a1a1aa', marginTop: 6, fontSize: 13 }}>
              これがダサいので置き換える対象。
            </p>
          </header>
          <SectionLabel>Current mark at the same sizes</SectionLabel>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 24,
              padding: 20,
              borderRadius: 10,
              background: 'transparent',
            }}
          >
            {sizes.map((s) => (
              <SizeBox key={s} size={s}>
                <CurrentMark size={s} />
              </SizeBox>
            ))}
          </div>
          <SectionLabel>22px on different backgrounds</SectionLabel>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { bg: DARK, label: 'dark' },
              { bg: PAPER, label: 'paper' },
              { bg: WHITE, label: 'white' },
            ].map((b) => (
              <div
                key={b.label}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  padding: 24,
                  borderRadius: 10,
                  background: b.bg,
                  border: '1px solid #26262e',
                  minWidth: 120,
                }}
              >
                <CurrentMark size={22} />
                <span style={{ marginTop: 12, fontSize: 10, color: b.bg === DARK ? '#71717a' : '#444' }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <footer style={{ marginTop: 64, color: '#71717a', fontSize: 12 }}>
          このページは選定用の一時ルートです。決定後に削除します。
        </footer>
      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        color: '#71717a',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginTop: 24,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function SizeBox({ children, size }: { children: React.ReactNode; size: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: 100 }}>{children}</div>
      <span style={{ fontSize: 10, color: '#71717a' }}>{size}px</span>
    </div>
  );
}

function SizeRow({
  Mark,
  color,
  bg,
}: {
  Mark: MarkComp;
  color: string;
  bg: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 24,
        padding: 20,
        borderRadius: 10,
        background: bg,
      }}
    >
      {sizes.map((s) => (
        <SizeBox key={s} size={s}>
          <Mark size={s} color={color} />
        </SizeBox>
      ))}
    </div>
  );
}

function BackgroundRow({
  Mark,
  size,
  color,
}: {
  Mark: MarkComp;
  size: number;
  color: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {[
        { bg: DARK, label: 'dark', secondary: '#71717a' },
        { bg: PAPER, label: 'paper', secondary: '#444' },
        { bg: WHITE, label: 'white', secondary: '#444' },
      ].map((b) => (
        <div
          key={b.label}
          style={{
            display: 'grid',
            placeItems: 'center',
            padding: 24,
            borderRadius: 10,
            background: b.bg,
            border: '1px solid #26262e',
            minWidth: 120,
          }}
        >
          <Mark size={size} color={color} />
          <span style={{ marginTop: 12, fontSize: 10, color: b.secondary }}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function AppleIconRow({ Mark }: { Mark: MarkComp }) {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {/* Style 1: orange mark on dark — most likely apple-icon style */}
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 180,
          height: 180,
          borderRadius: 36,
          background: DARK,
          border: '1px solid #26262e',
        }}
      >
        <Mark size={120} color={ORANGE} />
      </div>
      {/* Style 2: white mark inside orange gradient (current style) */}
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 180,
          height: 180,
          borderRadius: 36,
          background: 'linear-gradient(135deg, #ec5e2a, #c2451a 60%, #8a2f10)',
        }}
      >
        <Mark size={120} color="#fff" />
      </div>
      {/* Style 3: orange mark on white — for share/light contexts */}
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 180,
          height: 180,
          borderRadius: 36,
          background: WHITE,
          border: '1px solid #26262e',
        }}
      >
        <Mark size={120} color={ORANGE} />
      </div>
    </div>
  );
}

function NavSimulation({ Mark }: { Mark: MarkComp }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: 6,
        borderRadius: 999,
        background: 'rgba(14,14,18,0.78)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        width: 'fit-content',
        fontSize: 13,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '6px 6px 6px 12px',
        }}
      >
        <Mark size={22} color={ORANGE} />
        <span style={{ color: '#f4f4f5', fontWeight: 550, fontFamily: 'inherit' }}>
          teeeen.lab
        </span>
      </div>
      {['Projects', 'Lab', 'Notes', 'About'].map((l) => (
        <span
          key={l}
          style={{
            padding: '7px 14px',
            color: '#a1a1aa',
            fontFamily: 'inherit',
          }}
        >
          {l}
        </span>
      ))}
    </div>
  );
}
