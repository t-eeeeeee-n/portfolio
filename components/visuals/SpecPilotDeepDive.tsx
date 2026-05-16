import type { CSSProperties, ReactNode } from 'react';

const TONE = {
  surface: 'var(--d-bg-1)',
  surfaceMuted: 'var(--d-bg-2)',
  line: 'var(--d-line)',
  lineSoft: 'var(--d-line-2)',
  text0: 'var(--d-text-0)',
  text1: 'var(--d-text-1)',
  text2: 'var(--d-text-2)',
  text3: 'var(--d-text-3)',
};

type NodeKind = 'default' | 'muted' | 'agent' | 'accent' | 'output';

type SpNodeProps = {
  label: string;
  sub?: string;
  kind?: NodeKind;
  w?: number | string;
  n?: string;
  style?: CSSProperties;
};

function SpNode({ label, sub, kind = 'default', w, n, style }: SpNodeProps) {
  const palette: Record<NodeKind, { bg: string; border: string; color: string }> = {
    default: { bg: TONE.surface, border: TONE.line, color: TONE.text0 },
    muted: { bg: TONE.surfaceMuted, border: TONE.lineSoft, color: TONE.text1 },
    agent: { bg: TONE.surface, border: 'rgba(var(--accent-rgb), 0.35)', color: TONE.text0 },
    accent: {
      bg: 'rgba(var(--accent-rgb), 0.10)',
      border: 'rgba(var(--accent-rgb), 0.45)',
      color: TONE.text0,
    },
    output: { bg: TONE.text0, border: TONE.text0, color: 'var(--d-bg-0)' },
  };
  const p = palette[kind];

  return (
    <div
      style={{
        width: w,
        background: p.bg,
        border: `1px solid ${p.border}`,
        borderRadius: 10,
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontFamily: 'var(--font-sans)',
        color: p.color,
        boxShadow:
          kind === 'agent' || kind === 'accent'
            ? '0 10px 24px -16px rgba(var(--accent-rgb), 0.4)'
            : '0 6px 16px -12px rgba(0,0,0,0.4)',
        position: 'relative',
        ...style,
      }}
    >
      {n && (
        <span
          style={{
            position: 'absolute',
            top: -8,
            left: 10,
            background: 'var(--d-bg-0)',
            padding: '0 6px',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: TONE.text3,
            letterSpacing: '0.05em',
          }}
        >
          {n}
        </span>
      )}
      <div style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: '-0.005em' }}>{label}</div>
      {sub && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: kind === 'output' ? 'rgba(255,255,255,0.55)' : TONE.text2,
            lineHeight: 1.5,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function SpConnector() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 14px',
      }}
      aria-hidden="true"
    >
      <svg width="34" height="10" viewBox="0 0 34 10">
        <line
          x1="0"
          y1="5"
          x2="26"
          y2="5"
          stroke="var(--d-line)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M 26 1 L 32 5 L 26 9"
          fill="none"
          stroke="var(--d-line)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SpHead({
  idx,
  eyebrow,
  title,
  lede,
}: {
  idx: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div data-reveal style={{ marginBottom: 36 }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: TONE.text2,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 14,
        }}
      >
        <span style={{ color: TONE.text3 }}>§ {idx}</span>
        <span
          style={{
            width: 28,
            height: 1,
            background: TONE.line,
            transform: 'translateY(-4px)',
          }}
        />
        <span>{eyebrow}</span>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 2.6vw, 34px)',
          lineHeight: 1.15,
          letterSpacing: '-0.015em',
          margin: 0,
          color: TONE.text0,
          maxWidth: 760,
        }}
      >
        {title}
      </h3>
      {lede && (
        <p
          style={{
            marginTop: 14,
            color: TONE.text1,
            fontSize: 15.5,
            lineHeight: 1.7,
            maxWidth: 680,
            margin: '14px 0 0',
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/* ===========================================================
   SECTION A — Product Positioning
   =========================================================== */
function SpPositioning() {
  return (
    <div
      data-reveal
      className="grid-bg sp-pos-card"
      style={{
        position: 'relative',
        background: TONE.surface,
        border: `1px solid ${TONE.lineSoft}`,
        borderRadius: 16,
        padding: '48px 36px',
        overflow: 'hidden',
      }}
    >
      <div
        className="sp-pos-row"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1.1fr auto 1fr auto 1fr auto 0.85fr',
          gap: 0,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SpNode kind="muted" label="顧客との会議" sub="議事録" />
        <SpConnector />
        <SpNode kind="accent" label="SpecPilot" sub="質問 → 収束 → 設計" />
        <SpConnector />
        <SpNode kind="default" label="vibe pack" sub="Core / Archetype / Dynamic" />
        <SpConnector />
        <SpNode kind="muted" label="25+ AI dev tools" sub="Claude Code · Cursor · Kiro …" />
        <SpConnector />
        <SpNode kind="output" label="実装" sub="動く初期状態" />
      </div>

      {/* user loop */}
      <div
        className="sp-pos-loop"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          marginTop: 36,
          color: TONE.text2,
          fontFamily: 'var(--font-mono)',
          fontSize: 11.5,
        }}
      >
        <span style={{ color: TONE.text3 }}>↺</span>
        <span>SpecPilot</span>
        <span style={{ width: 18, height: 1, background: TONE.line }} />
        <span style={{ color: 'var(--accent)' }}>質問</span>
        <span style={{ width: 18, height: 1, background: TONE.line }} />
        <span>ユーザー</span>
        <span style={{ width: 18, height: 1, background: TONE.line }} />
        <span style={{ color: 'var(--accent)' }}>回答</span>
        <span style={{ width: 18, height: 1, background: TONE.line }} />
        <span>SpecPilot</span>
        <span style={{ color: TONE.text3 }}>(収束まで)</span>
      </div>

      {/* value annotation */}
      <div
        className="sp-pos-value"
        style={{
          marginTop: 36,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        {[
          { n: '01', t: '質問で収束させる', d: '未決・矛盾・不足を会話で解消する' },
          { n: '02', t: 'vibe pack を生成する', d: '動く初期状態までの距離を最短化する' },
        ].map((v) => (
          <div
            key={v.n}
            style={{
              background: 'var(--d-bg-2)',
              border: `1px solid ${TONE.lineSoft}`,
              borderRadius: 10,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'baseline',
              gap: 14,
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: TONE.text3 }}>
              {v.n}
            </span>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: TONE.text0,
                  marginBottom: 2,
                }}
              >
                {v.t}
              </div>
              <div style={{ fontSize: 12.5, color: TONE.text2, lineHeight: 1.55 }}>{v.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===========================================================
   SECTION B — Agent Pipeline (11 stages + 2 feedback loops)
   =========================================================== */
type Step = { n: string; k: NodeKind; label: string; sub: string };

const PIPELINE_STEPS: Step[] = [
  { n: '01', k: 'muted', label: '議事録 (input)', sub: 'input.md' },
  { n: '02', k: 'agent', label: 'Extractor Agent', sub: '要件候補 · 確定 · 未決を抽出' },
  { n: '03', k: 'agent', label: 'Question Agent', sub: '質問生成 + 拡張カタログ判定' },
  { n: '04', k: 'muted', label: 'ユーザー回答', sub: 'interactive · 収束まで反復' },
  {
    n: '05',
    k: 'accent',
    label: '収束判定',
    sub: 'Blocker / Major = 0 · Archetype 必須 = 100%',
  },
  { n: '06', k: 'accent', label: '確認フェーズ', sub: 'AI 理解のすり合わせ · ユーザー承認' },
  { n: '07', k: 'agent', label: 'Designer Agent', sub: 'docs/prd · design · decisions' },
  { n: '08', k: 'agent', label: 'Spec Agent', sub: 'openapi · prisma · sql · rbac' },
  { n: '09', k: 'agent', label: 'Linter Agent', sub: '整合チェック · 3レイヤー完全性' },
  { n: '10', k: 'default', label: 'AGENTS.md 再生成 + tasks.md', sub: 'vibe pack assembly' },
  {
    n: '11',
    k: 'output',
    label: 'vibe pack 出力',
    sub: 'Claude Code / Cursor / Kiro 等 25+ ツール',
  },
];

type Loop = { from: number; to: number; label: string };

const PIPELINE_LOOPS: Loop[] = [
  { from: 4, to: 3, label: '不十分 → ユーザーへ戻る' },
  { from: 5, to: 2, label: '大きな相違 → 質問へ戻る' },
];

function SpPipeline() {
  return (
    <div
      data-reveal
      style={{
        background: TONE.surface,
        border: `1px solid ${TONE.lineSoft}`,
        borderRadius: 16,
        padding: '36px 24px 36px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          gap: 0,
          position: 'relative',
        }}
      >
        {/* loop rail (left side) */}
        <div className="sp-pipe-rail" style={{ position: 'relative' }} aria-hidden="true">
          {PIPELINE_LOOPS.map((l, i) => {
            const stepH = 76;
            const top = l.to * stepH + 28;
            const height = (l.from - l.to) * stepH;
            return (
              <div
                key={`${l.from}-${l.to}`}
                style={{
                  position: 'absolute',
                  top,
                  left: 30 + i * 20,
                  width: 60,
                  height,
                  borderLeft: '1px dashed var(--accent)',
                  borderTop: '1px dashed var(--accent)',
                  borderBottom: '1px dashed var(--accent)',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  opacity: 0.55,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: -10,
                    transform: 'translate(-100%, -50%)',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--accent)',
                    letterSpacing: '0.04em',
                    background: TONE.surface,
                    padding: '2px 6px',
                    borderRadius: 4,
                    border: '1px solid rgba(var(--accent-rgb), 0.25)',
                  }}
                >
                  {l.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* steps column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            position: 'relative',
          }}
        >
          {PIPELINE_STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: TONE.text3,
                  width: 26,
                }}
              >
                {s.n}
              </span>
              <SpNode kind={s.k} label={s.label} sub={s.sub} w="100%" style={{ flex: 1 }} />
            </div>
          ))}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 34,
              top: 12,
              bottom: 12,
              width: 1,
              background:
                'linear-gradient(to bottom, transparent, var(--d-line) 8%, var(--d-line) 92%, transparent)',
              zIndex: -1,
            }}
          />
        </div>
      </div>

      {/* Phase 2 — Estimator annotation */}
      <div
        style={{
          marginTop: 28,
          padding: '14px 18px',
          border: '1px dashed var(--d-line)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: TONE.surfaceMuted,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: TONE.text3,
            letterSpacing: '0.06em',
            padding: '2px 6px',
            border: '1px solid var(--d-line)',
            borderRadius: 4,
            textTransform: 'uppercase',
          }}
        >
          Phase 2
        </span>
        <span style={{ fontSize: 13.5, color: TONE.text0, fontWeight: 500 }}>Estimator Agent</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            color: TONE.text2,
          }}
        >
          estimate.md (工数見積もり) · Linter → AGENTS.md 間に接続
        </span>
      </div>
    </div>
  );
}

/* ===========================================================
   SECTION C — vibe pack Output Structure
   =========================================================== */
type DocEntry = string | { text: string; note: string };

type Column = {
  key: string;
  n: string;
  title: string;
  rule: string;
  kind: 'accent' | 'agent' | 'default';
  docs: DocEntry[];
};

const VIBE_COLUMNS: Column[] = [
  {
    key: 'core',
    n: '01',
    title: 'Core',
    rule: '欠落 = Linter Error',
    kind: 'accent',
    docs: [
      'AGENTS.md',
      'tasks.md',
      'docs/prd/overview.md',
      'docs/prd/requirements.md',
      'docs/prd/scope.md',
      'docs/decisions/log.md',
    ],
  },
  {
    key: 'archetype',
    n: '02',
    title: 'Archetype',
    rule: '欠落 = Linter Warning',
    kind: 'agent',
    docs: [
      'docs/prd/non-functional.md',
      'docs/detail/ui.md',
      'docs/design/architecture.md',
      'docs/design/api-design.md',
      'docs/design/ui-guidelines.md',
      'docs/design/design-system.md',
      'docs/diagrams/er.mmd',
      'docs/diagrams/screen-flow.mmd',
      'docs/specs/openapi.yaml',
      'docs/specs/schema.prisma',
      'docs/specs/schema.sql',
      'docs/specs/rbac.yaml',
      { text: 'docs/estimate.md', note: '任意 · Phase 2' },
    ],
  },
  {
    key: 'dynamic',
    n: '03',
    title: 'Dynamic',
    rule: '収束ループ中に動的追加',
    kind: 'default',
    docs: [
      { text: 'docs/diagrams/*.mmd', note: 'ステータス遷移 · API フロー等' },
      { text: 'docs/specs/design-tokens.json', note: 'Phase 2' },
      {
        text: '拡張カタログ発動による追加',
        note: '対象外は decisions/log.md に根拠記録',
      },
    ],
  },
];

const KIND_STYLES: Record<Column['kind'], { dot: string; border: string; bg: string }> = {
  accent: {
    dot: 'var(--accent)',
    border: 'rgba(var(--accent-rgb), 0.45)',
    bg: 'rgba(var(--accent-rgb), 0.06)',
  },
  agent: { dot: 'var(--d-text-1)', border: 'var(--d-line)', bg: TONE.surface },
  default: { dot: 'var(--d-text-3)', border: 'var(--d-line)', bg: TONE.surface },
};

function SpVibePack() {
  return (
    <div data-reveal>
      {/* root node */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
        <div
          style={{
            padding: '10px 22px',
            background: 'var(--d-text-0)',
            color: 'var(--d-bg-0)',
            borderRadius: 999,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          vibe pack
        </div>
      </div>

      {/* branch lines */}
      <svg
        viewBox="0 0 600 50"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 40, display: 'block' }}
        aria-hidden="true"
      >
        <line x1="300" y1="0" x2="300" y2="20" stroke="var(--d-line)" strokeWidth="1" />
        <line x1="100" y1="20" x2="500" y2="20" stroke="var(--d-line)" strokeWidth="1" />
        <line x1="100" y1="20" x2="100" y2="46" stroke="var(--d-line)" strokeWidth="1" />
        <line x1="300" y1="20" x2="300" y2="46" stroke="var(--d-line)" strokeWidth="1" />
        <line x1="500" y1="20" x2="500" y2="46" stroke="var(--d-line)" strokeWidth="1" />
      </svg>

      <div
        className="sp-vibe-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}
      >
        {VIBE_COLUMNS.map((c) => {
          const ks = KIND_STYLES[c.kind];
          return (
            <div
              key={c.key}
              style={{
                background: ks.bg,
                border: `1px solid ${ks.border}`,
                borderRadius: 14,
                padding: '20px 20px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: ks.dot,
                      transform: 'translateY(-2px)',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: TONE.text3,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {c.n}
                  </span>
                  <h4
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontSize: 22,
                      letterSpacing: '-0.01em',
                      color: TONE.text0,
                    }}
                  >
                    {c.title}
                  </h4>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: TONE.text2,
                    letterSpacing: '0.02em',
                  }}
                >
                  {c.rule}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  borderTop: '1px dashed var(--d-line-2)',
                  paddingTop: 12,
                }}
              >
                {c.docs.map((d, i) => {
                  const text = typeof d === 'string' ? d : d.text;
                  const note = typeof d === 'string' ? null : d.note;
                  return (
                    <div
                      key={text}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 8,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11.5,
                        lineHeight: 1.5,
                        color: TONE.text1,
                      }}
                    >
                      <span style={{ color: TONE.text3, flexShrink: 0 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ wordBreak: 'break-all' }}>
                        {text}
                        {note && (
                          <span style={{ color: TONE.text3, marginLeft: 6 }}>({note})</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===========================================================
   Deep dive — composed section
   =========================================================== */
export function SpecPilotDeepDive() {
  return (
    <section style={{ padding: '32px 0 96px', borderTop: '1px solid var(--d-line)' }}>
      <div className="container">
        <div data-reveal style={{ marginBottom: 56, maxWidth: 720 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Deep dive · System Design
          </div>
          <h2 className="h-section" style={{ fontSize: 'clamp(28px, 3.4vw, 42px)' }}>
            会議から、動く初期状態へ。
          </h2>
          <p
            style={{
              marginTop: 18,
              color: TONE.text1,
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 640,
            }}
          >
            SpecPilot は単一の LLM 呼び出しではなく、役割で分割した複数の Agent と
            人間との収束ループで成り立っています。以下、プロダクトの位置づけ → Agent パイプライン
            → 出力構造の順で。
          </p>
        </div>

        <div style={{ marginBottom: 72 }}>
          <SpHead
            idx="A"
            eyebrow="Positioning"
            title="会議 → SpecPilot → vibe pack → 実装。"
            lede="既存の AI 開発ツールに乗せるのではなく、その前段の『要件を確定させる工程』そのものを担う。"
          />
          <SpPositioning />
        </div>

        <div style={{ marginBottom: 72 }}>
          <SpHead
            idx="B"
            eyebrow="Agent Pipeline"
            title="11 段の Agent + 人間の収束ループ。"
            lede="抽出 → 質問 → 収束 → 確認 → 設計 → 仕様 → リント。各段は独立した Agent として差し替え可能。Phase 2 で Estimator を追加。"
          />
          <SpPipeline />
        </div>

        <div>
          <SpHead
            idx="C"
            eyebrow="Output · vibe pack"
            title="Core / Archetype / Dynamic の 3 層構造。"
            lede="出力ドキュメントを役割で分割。Core は欠けたら Linter Error、Archetype は Warning、Dynamic は収束過程で動的に積み上がる。"
          />
          <SpVibePack />
        </div>
      </div>
    </section>
  );
}
