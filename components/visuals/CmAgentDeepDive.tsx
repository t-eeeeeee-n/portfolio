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

type NodeKind = 'default' | 'muted' | 'accent' | 'output' | 'dashed';

type CmNodeProps = {
  label: string;
  sub?: string;
  tag?: string;
  kind?: NodeKind;
  style?: CSSProperties;
};

function CmNode({ label, sub, tag, kind = 'default', style }: CmNodeProps) {
  const palette: Record<
    NodeKind,
    { bg: string; border: string; color: string; dashed?: boolean }
  > = {
    default: { bg: TONE.surface, border: TONE.line, color: TONE.text0 },
    muted: { bg: TONE.surfaceMuted, border: TONE.lineSoft, color: TONE.text1 },
    accent: {
      bg: 'rgba(var(--accent-rgb), 0.10)',
      border: 'rgba(var(--accent-rgb), 0.45)',
      color: TONE.text0,
    },
    output: { bg: TONE.text0, border: TONE.text0, color: 'var(--d-bg-0)' },
    dashed: { bg: 'transparent', border: TONE.line, color: TONE.text1, dashed: true },
  };
  const p = palette[kind];

  return (
    <div
      style={{
        background: p.bg,
        border: `1px ${p.dashed ? 'dashed' : 'solid'} ${p.border}`,
        borderRadius: 10,
        padding: '11px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        color: p.color,
        position: 'relative',
        ...style,
      }}
    >
      {tag && (
        <span
          style={{
            position: 'absolute',
            top: -7,
            right: 10,
            background: 'var(--d-bg-0)',
            padding: '0 6px',
            fontFamily: 'var(--font-mono)',
            fontSize: 9.5,
            color: TONE.text3,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {tag}
        </span>
      )}
      <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em' }}>{label}</div>
      {sub && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: kind === 'output' ? 'rgba(255,255,255,0.55)' : TONE.text2,
            lineHeight: 1.45,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function CmArrow({ label }: { label?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
      aria-hidden="true"
    >
      <svg width="60" height="10" viewBox="0 0 60 10">
        <line
          x1="0"
          y1="5"
          x2="52"
          y2="5"
          stroke="var(--d-line)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M 52 1 L 58 5 L 52 9"
          fill="none"
          stroke="var(--d-line)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--accent)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function CmHead({
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
   SECTION A — System Architecture (abstracted)
   =========================================================== */
const ARCH_KEYS: [string, string][] = [
  ['OpenAPI = SSoT', '型定義は 1 箇所。SDK は自動生成、手書き fetch は禁止。'],
  [
    'trace_id 伝播',
    'W3C Trace Context を FE → BE → Agent 全てに継承し、全ログの必須項目に。',
  ],
  [
    'Read-only に閉じる',
    '外部 RDB へのアクセスは View 経由・参照のみ。書き込みは内部 DB に閉じる。',
  ],
];

function CmArch() {
  return (
    <div
      data-reveal
      className="grid-bg"
      style={{
        background: TONE.surface,
        border: `1px solid ${TONE.lineSoft}`,
        borderRadius: 16,
        padding: 36,
      }}
    >
      <div
        className="cm-arch-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 18,
        }}
      >
        {/* FE column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="eyebrow" style={{ marginBottom: 2 }}>
            Frontend
          </div>
          <CmNode
            kind="accent"
            label="App Router 画面"
            sub="Next.js 15 · TS · Tailwind v4"
            tag="ui"
          />
          <CmNode
            kind="default"
            label="TypeScript SDK"
            sub="OpenAPI から自動生成 (Orval)"
            tag="codegen"
          />
          <CmNode
            kind="default"
            label="SSE クライアント"
            sub="EventSource · 進捗ストリーム"
            tag="realtime"
          />
        </div>

        {/* BE column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="eyebrow" style={{ marginBottom: 2 }}>
            Backend
          </div>
          <CmNode kind="accent" label="REST API" sub="FastAPI · Python 3.12" tag="api" />
          <CmNode
            kind="default"
            label="SSE エンドポイント"
            sub="ジョブ進捗を逐次配信"
            tag="realtime"
          />
          <CmNode
            kind="default"
            label="Job Service"
            sub="状態管理 · 永続化 · 監査"
            tag="service"
          />
          <CmNode
            kind="dashed"
            label="openapi.json"
            sub="Single Source of Truth"
            tag="contract"
          />
        </div>

        {/* Agents column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="eyebrow" style={{ marginBottom: 2 }}>
            Agents
          </div>
          <CmNode
            kind="accent"
            label="Main Agent"
            sub="司令塔 · Sub を順次呼び出し"
            tag="orchestrator"
          />
          <CmNode
            kind="default"
            label="Sub Agents × N"
            sub="役割ごとに分割 · A2A 通信"
            tag="ADK · A2A"
          />
        </div>
      </div>

      {/* storage / external row */}
      <div
        className="cm-arch-store"
        style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
        }}
      >
        <CmNode
          kind="muted"
          label="PostgreSQL 16"
          sub="ジョブ · イベント · 実行履歴"
          tag="store"
        />
        <CmNode
          kind="muted"
          label="社内 RDB · Read-only View"
          sub="Agent から View 経由でのみ参照"
          tag="external"
        />
        <CmNode
          kind="muted"
          label="業務ルール定義"
          sub="JSON で管理 · LLM が参照"
          tag="config"
        />
      </div>

      <div
        className="cm-arch-keys"
        style={{
          marginTop: 28,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
        }}
      >
        {ARCH_KEYS.map(([k, v]) => (
          <div
            key={k}
            style={{
              background: TONE.surfaceMuted,
              border: `1px solid ${TONE.lineSoft}`,
              borderRadius: 10,
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: TONE.text0,
                marginBottom: 6,
                letterSpacing: '-0.005em',
              }}
            >
              {k}
            </div>
            <div style={{ fontSize: 12.5, color: TONE.text2, lineHeight: 1.55 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===========================================================
   SECTION B — Multi-agent round-trip flow
   =========================================================== */
type Step = { n: string; role: string; desc: string; model: 'deterministic' | 'LLM' };

const FLOW_STEPS: Step[] = [
  {
    n: '01',
    role: 'データ取得',
    desc: '業務 View から必要なドメインデータを Read-only で取得。',
    model: 'deterministic',
  },
  {
    n: '02',
    role: '割付',
    desc: '制約条件 (尺・容量) に対し機械的に候補を割り振る。',
    model: 'deterministic',
  },
  {
    n: '03',
    role: '並び替え',
    desc: '業務ルール (must / should / 例外) を LLM が解釈し再配置。',
    model: 'LLM',
  },
  { n: '04', role: '採点', desc: '結果に対し LLM がスコアと reasoning を生成。', model: 'LLM' },
  {
    n: '05',
    role: '整形',
    desc: '出力フォーマットを統一・差分の説明可能性を確保。',
    model: 'deterministic',
  },
  {
    n: '06',
    role: '永続化 / 通知',
    desc: 'DB に書き込み、SSE で完了イベントを配信。',
    model: 'deterministic',
  },
];

function CmAgentFlow() {
  return (
    <div
      data-reveal
      style={{
        background: TONE.surface,
        border: `1px solid ${TONE.lineSoft}`,
        borderRadius: 16,
        padding: 36,
      }}
    >
      {/* main agent banner */}
      <div
        className="cm-main-banner"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 18px',
          background: 'rgba(var(--accent-rgb), 0.08)',
          border: `1px solid rgba(var(--accent-rgb), 0.4)`,
          borderRadius: 10,
          marginBottom: 18,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: 'var(--accent)',
            letterSpacing: '0.06em',
            padding: '3px 8px',
            border: '1px solid rgba(var(--accent-rgb), 0.4)',
            borderRadius: 4,
            textTransform: 'uppercase',
          }}
        >
          Main Agent
        </span>
        <span style={{ fontSize: 13.5, color: TONE.text0, fontWeight: 500 }}>
          各 Sub を順に呼び、戻ってから次に渡すラウンドトリップ方式
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: TONE.text2,
          }}
        >
          ↳ 各 Sub 完了で SSE を Push
        </span>
      </div>

      {/* sub agents */}
      <div
        className="cm-subs"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 10,
        }}
      >
        {FLOW_STEPS.map((s) => (
          <div
            key={s.n}
            style={{
              position: 'relative',
              padding: '14px 12px 12px',
              background: TONE.surfaceMuted,
              border: `1px solid ${TONE.lineSoft}`,
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minHeight: 200,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  color: TONE.text3,
                }}
              >
                {s.n}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9.5,
                  color: s.model === 'LLM' ? 'var(--accent)' : TONE.text2,
                  letterSpacing: '0.06em',
                  padding: '1px 6px',
                  border: `1px solid ${
                    s.model === 'LLM' ? 'rgba(var(--accent-rgb), 0.4)' : TONE.lineSoft
                  }`,
                  borderRadius: 4,
                  textTransform: 'uppercase',
                }}
              >
                {s.model}
              </span>
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: TONE.text0,
                letterSpacing: '-0.005em',
              }}
            >
              {s.role}
            </div>
            <div style={{ fontSize: 11.5, color: TONE.text2, lineHeight: 1.55 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* HITL */}
      <div
        className="cm-hitl"
        style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 18,
          alignItems: 'center',
          padding: '16px 20px',
          background: TONE.surfaceMuted,
          border: `1px dashed ${TONE.line}`,
          borderRadius: 12,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: TONE.text3,
            letterSpacing: '0.06em',
            padding: '2px 8px',
            border: `1px solid ${TONE.line}`,
            borderRadius: 4,
            textTransform: 'uppercase',
          }}
        >
          Human-in-the-Loop
        </span>
        <span style={{ fontSize: 13.5, color: TONE.text0 }}>
          完了後、作業者が結果と reasoning を確認 → 必要に応じて手動で業務システムへ反映。
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: TONE.text2,
          }}
        >
          auto-apply は意図的に非対応
        </span>
      </div>

      {/* trade-off note */}
      <div
        style={{
          marginTop: 20,
          padding: '14px 18px',
          background: TONE.surface,
          border: `1px solid ${TONE.lineSoft}`,
          borderRadius: 10,
          fontSize: 13,
          color: TONE.text1,
          lineHeight: 1.6,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            color: TONE.text3,
            letterSpacing: '0.06em',
            marginRight: 10,
          }}
        >
          NOTE
        </span>
        Phase 1 では parallel ではなくラウンドトリップを採用。各 Sub の入出力を観測しやすく、後段からの差し戻しと A/B 検証を優先した設計。
      </div>
    </div>
  );
}

/* ===========================================================
   SECTION C — Key Patterns
   =========================================================== */
type Pattern = { n: string; title: string; detail: string; bullets: string[] };

const PATTERNS: Pattern[] = [
  {
    n: '01',
    title: 'OpenAPI コードファースト',
    detail:
      'FastAPI の型定義から openapi.json を自動生成 → Orval で TypeScript SDK を生成 → FE は SDK のみを通して BE と通信。',
    bullets: ['型はサーバ側に 1 箇所', '手書き fetch を禁止', '破壊的変更は型エラーで検知'],
  },
  {
    n: '02',
    title: 'W3C Trace Context 伝播',
    detail:
      'Frontend → Backend → Agent → LLM 呼び出し → 内部ジョブまで traceparent を継承。構造化ログに必須項目化。',
    bullets: [
      '1 リクエストの全履歴を後から再構成',
      'Agent 境界も span として残す',
      'LLM のリクエスト ID を span に紐付け',
    ],
  },
  {
    n: '03',
    title: 'Read-only に閉じた外部接続',
    detail:
      '外部 RDB は View 経由・参照のみ。書き込みは内部 DB に限定し、業務システムへの反映は Human-in-the-Loop に委ねる。',
    bullets: [
      '障害時の二次被害を回避',
      '監査ログを内部に集約',
      '業務システム側の権限境界を侵さない',
    ],
  },
  {
    n: '04',
    title: 'イベント駆動 (SSE + 構造化ログ)',
    detail:
      'ジョブの進捗は SSE で逐次配信。Sub Agent 完了 / エラー / 制約違反などを意味のあるイベントに分割。',
    bullets: [
      'UI のリアルタイム更新',
      'ログから挙動を再現可能',
      '後段の通知・ダッシュボードに転用可',
    ],
  },
];

function CmPatterns() {
  return (
    <div
      data-reveal
      className="cm-patterns"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
    >
      {PATTERNS.map((p) => (
        <div
          key={p.n}
          style={{
            background: TONE.surface,
            border: `1px solid ${TONE.lineSoft}`,
            borderRadius: 14,
            padding: '22px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: TONE.text3,
              }}
            >
              {p.n}
            </span>
            <h4
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: TONE.text0,
              }}
            >
              {p.title}
            </h4>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              color: TONE.text1,
              lineHeight: 1.65,
            }}
          >
            {p.detail}
          </p>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              paddingTop: 8,
              borderTop: `1px dashed ${TONE.lineSoft}`,
            }}
          >
            {p.bullets.map((b) => (
              <li
                key={b}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11.5,
                  color: TONE.text2,
                  paddingLeft: 14,
                  position: 'relative',
                  lineHeight: 1.55,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 8,
                    width: 6,
                    height: 1,
                    background: 'var(--accent)',
                  }}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ===========================================================
   SECTION D — Job state machine
   =========================================================== */
function CmStates() {
  return (
    <div
      data-reveal
      style={{
        background: TONE.surface,
        border: `1px solid ${TONE.lineSoft}`,
        borderRadius: 16,
        padding: 36,
      }}
    >
      <div
        className="cm-states"
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto 1fr auto',
          gap: 14,
          alignItems: 'stretch',
        }}
      >
        <CmNode kind="muted" label="pending" sub="POST /jobs · 受付" />
        <CmArrow label="開始" />
        <CmNode kind="accent" label="running" sub="Main → Sub × N · SSE" tag="streaming" />
        <CmArrow label="完了" />
        <CmNode kind="output" label="completed" sub="DB 永続化 + 通知" />
      </div>

      <div
        className="cm-states-alt"
        style={{
          marginTop: 14,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
        }}
      >
        <div
          style={{
            padding: '14px 16px',
            background: TONE.surfaceMuted,
            border: `1px solid ${TONE.lineSoft}`,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: TONE.text3,
              marginBottom: 6,
            }}
          >
            running → failed
          </div>
          <div style={{ fontSize: 13, color: TONE.text0 }}>例外 · 制約違反 · タイムアウト</div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: TONE.text2,
              marginTop: 4,
            }}
          >
            reasoning と context を残して終了
          </div>
        </div>
        <div
          style={{
            padding: '14px 16px',
            background: TONE.surfaceMuted,
            border: `1px solid ${TONE.lineSoft}`,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: TONE.text3,
              marginBottom: 6,
            }}
          >
            running → cancelled
          </div>
          <div style={{ fontSize: 13, color: TONE.text0 }}>作業者キャンセル</div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: TONE.text2,
              marginTop: 4,
            }}
          >
            SSE 切断 + ジョブ中断
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   Deep dive — composed section
   =========================================================== */
export function CmAgentDeepDive() {
  return (
    <section style={{ padding: '32px 0 96px', borderTop: '1px solid var(--d-line)' }}>
      <div className="container">
        <div data-reveal style={{ marginBottom: 56, maxWidth: 720 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Deep dive · Architecture Patterns
          </div>
          <h2 className="h-section" style={{ fontSize: 'clamp(28px, 3.4vw, 42px)' }}>
            Multi-agent + Human-in-the-Loop の設計。
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
            業務システムを直接書き換えず、参照と提案に役割を絞った PoC。
            外部仕様 · 業務固有情報は伏せ、汎用的に再利用できる設計パターンを抜粋しています。
          </p>
        </div>

        <div style={{ marginBottom: 72 }}>
          <CmHead
            idx="A"
            eyebrow="System Architecture"
            title="FE / BE / Agents / Storage を疎結合に。"
            lede="Frontend は自動生成 SDK でしか BE に触れず、Agent は社内 RDB に View 経由で参照だけ。書き込みは内部 DB に閉じ、外部システムへの反映は人手に委ねる構成。"
          />
          <CmArch />
        </div>

        <div style={{ marginBottom: 72 }}>
          <CmHead
            idx="B"
            eyebrow="Multi-agent flow"
            title="Main Agent + 6 Sub Agent のラウンドトリップ。"
            lede="役割で分けた 6 Sub を Main から順に呼び、各完了で SSE を Push。決定的な処理と LLM 解釈の責務を分け、後段から差し戻しやすい設計に。"
          />
          <CmAgentFlow />
        </div>

        <div style={{ marginBottom: 72 }}>
          <CmHead
            idx="C"
            eyebrow="Key patterns"
            title="OpenAPI · trace_id · View · SSE。"
            lede="今回特に意識した 4 つの設計判断。どれもプロジェクト固有ではなく、別のサービスでもそのまま使える形に整理しました。"
          />
          <CmPatterns />
        </div>

        <div>
          <CmHead
            idx="D"
            eyebrow="Job state machine"
            title="pending → running → completed / failed / cancelled。"
            lede="ジョブのライフサイクルを 5 状態に正規化し、SSE と DB の両方で観測可能にする。エラー時も reasoning を残して終了する。"
          />
          <CmStates />
        </div>
      </div>
    </section>
  );
}
