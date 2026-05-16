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

type YmNodeProps = {
  label: string;
  sub?: string;
  tag?: string;
  kind?: NodeKind;
  style?: CSSProperties;
};

function YmNode({ label, sub, tag, kind = 'default', style }: YmNodeProps) {
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
        fontFamily: 'var(--font-sans)',
        color: p.color,
        boxShadow:
          kind === 'accent'
            ? '0 10px 24px -16px rgba(var(--accent-rgb), 0.35)'
            : kind === 'output'
              ? '0 10px 24px -16px rgba(0,0,0,0.5)'
              : 'none',
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

function YmArrow() {
  return (
    <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden="true">
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
  );
}

function YmHead({
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
   SECTION A — System Architecture (4×4 grid + key facts)
   =========================================================== */
type ArchNode = { kind: NodeKind; label: string; sub: string; tag: string };

const ARCH_NODES: ArchNode[] = [
  { kind: 'muted', label: 'ユーザー', sub: 'ブラウザ', tag: 'external' },
  { kind: 'accent', label: 'Next.js 16', sub: 'App Router · SSR', tag: 'cloud run' },
  { kind: 'accent', label: 'NestJS 10', sub: 'REST API · OpenAPI', tag: 'cloud run' },
  { kind: 'default', label: 'Firebase Auth', sub: 'Client SDK + Admin SDK', tag: 'auth' },
  { kind: 'muted', label: 'GitHub Actions', sub: 'CI/CD · OIDC', tag: 'ci/cd' },
  { kind: 'default', label: 'Artifact Registry', sub: 'Container images', tag: 'registry' },
  { kind: 'accent', label: 'Gemini 3.0 Flash', sub: 'チラシ画像解析', tag: 'vertex ai' },
  { kind: 'dashed', label: 'Claude Sonnet / Opus', sub: 'Lv3-4 Agent · 将来', tag: 'vertex ai' },
  { kind: 'muted', label: 'Cloud Scheduler', sub: '日次 / 月次', tag: 'trigger' },
  { kind: 'accent', label: 'Cloud Run Jobs', sub: 'scrape · store-collect', tag: 'batch' },
  { kind: 'default', label: 'Cloud SQL', sub: 'PostgreSQL 16 · Unix socket', tag: 'db' },
  { kind: 'default', label: 'Secret Manager', sub: 'DB · Firebase · API keys', tag: 'config' },
  { kind: 'muted', label: 'Google Places API', sub: '店舗マスタ収集', tag: 'external' },
  { kind: 'muted', label: 'チラシ集約サイト', sub: 'チラシ画像取得', tag: 'external' },
  { kind: 'muted', label: 'チェーン公式サイト', sub: 'チラシ取得 (chain別)', tag: 'external' },
  { kind: 'muted', label: 'Sentry · GA', sub: '観測 · エラー · 解析', tag: 'observability' },
];

const ARCH_KEYS: [string, string][] = [
  [
    'Service + Jobs',
    'Cloud Run を Service (常駐 frontend/backend) と Jobs (scrape/store-collect) の 2 系統で運用。',
  ],
  [
    '非対称な認証設計',
    'ログイン: Firebase Client (FE)。検証: Admin SDK (BE)。fe/be で責任を分割。',
  ],
  [
    'secrets を env で配る',
    'Secret Manager → Cloud Run の env に自動注入。コードからは普通の `process.env` で読む。',
  ],
];

function YmArch() {
  return (
    <div
      data-reveal
      className="grid-bg"
      style={{
        background: TONE.surface,
        border: `1px solid ${TONE.lineSoft}`,
        borderRadius: 16,
        padding: 36,
        overflow: 'hidden',
      }}
    >
      <div
        className="ym-arch-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto auto auto auto',
          gap: 14,
          position: 'relative',
        }}
      >
        {ARCH_NODES.map((n) => (
          <YmNode
            key={`${n.label}-${n.tag}`}
            kind={n.kind}
            label={n.label}
            sub={n.sub}
            tag={n.tag}
          />
        ))}
      </div>

      <div
        className="ym-arch-keys"
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
   SECTION B — Agent Architecture (Lv1→Lv4 + MCP)
   =========================================================== */
type LevelState = 'legacy' | 'now' | 'next' | 'future';

const LEVELS: { lv: string; title: string; sub: string; state: LevelState; offset: number }[] = [
  { lv: 'Lv1', title: 'コードベタ書き', sub: '従来の各チェーン個別 scraper', state: 'legacy', offset: 0 },
  {
    lv: 'Lv2',
    title: 'Config 駆動',
    sub: 'chain-profiles.ts + 汎用 resolver · 管理画面で更新可',
    state: 'now',
    offset: 1,
  },
  {
    lv: 'Lv3',
    title: 'Config + LLM フォールバック',
    sub: '未知チェーン / HTML 変更時のみ Agent 起動',
    state: 'next',
    offset: 2,
  },
  {
    lv: 'Lv4',
    title: 'フル Agent',
    sub: '管理者チャット UI から自然言語で操作',
    state: 'future',
    offset: 3,
  },
];

const STATE_STYLE: Record<LevelState, { dot: string; label: string }> = {
  legacy: { dot: TONE.text3, label: 'legacy' },
  now: { dot: 'var(--accent)', label: 'now · production' },
  next: { dot: 'var(--accent)', label: 'next' },
  future: { dot: TONE.text2, label: 'design ready' },
};

const MCP_PRINCIPLES: [string, string][] = [
  ['Lv2 を変えない', '既存 scraper はそのまま MCP ツールにラップ。Agent は薄く載せる。'],
  ['書き込み系は HITL', 'stores.apply_change のような DB 書き換えは自動承認しない。'],
  ['クライアントは選べる', 'バッチ · Desktop · 管理画面 Chat を共通の MCP で結ぶ。'],
];

function YmAgents() {
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
      {/* Lv1→Lv4 stair */}
      <div className="ym-lv-wrap" style={{ position: 'relative', marginBottom: 48 }}>
        {LEVELS.map((l) => {
          const ss = STATE_STYLE[l.state];
          return (
            <div
              key={l.lv}
              className="ym-lv-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr auto',
                gap: 16,
                alignItems: 'center',
                marginLeft: l.offset * 24,
                padding: '14px 16px',
                background:
                  l.state === 'now' ? 'rgba(var(--accent-rgb), 0.06)' : TONE.surfaceMuted,
                border: `1px ${l.state === 'future' ? 'dashed' : 'solid'} ${
                  l.state === 'now' ? 'rgba(var(--accent-rgb), 0.4)' : TONE.lineSoft
                }`,
                borderRadius: 10,
                marginBottom: 8,
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: l.state === 'now' ? 'var(--accent)' : TONE.text2,
                  letterSpacing: '0.06em',
                }}
              >
                {l.lv}
              </span>
              <div>
                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: TONE.text0,
                    letterSpacing: '-0.005em',
                    marginBottom: 2,
                  }}
                >
                  {l.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: TONE.text2,
                    lineHeight: 1.5,
                  }}
                >
                  {l.sub}
                </div>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  color: l.state === 'now' ? 'var(--accent)' : TONE.text2,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: ss.dot,
                  }}
                />
                {ss.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* MCP overview */}
      <div style={{ marginBottom: 20 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          MCP-centric (Lv3-4)
        </div>
      </div>
      <div
        className="ym-mcp"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          gap: 14,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <YmNode kind="muted" label="バッチ Agent" sub="DiscoveryAgent · RepairAgent" />
          <YmNode kind="muted" label="Claude Desktop" sub="開発用クライアント" />
          <YmNode kind="muted" label="管理画面 Chat UI" sub="Vercel AI SDK" />
        </div>
        <YmArrow />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <YmNode kind="accent" label="MCP Server" sub="backend/src/mcp/server.ts" tag="hub" />
          <div
            style={{
              padding: '10px 12px',
              background: TONE.surfaceMuted,
              border: `1px solid ${TONE.lineSoft}`,
              borderRadius: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              lineHeight: 1.7,
              color: TONE.text1,
            }}
          >
            <div
              style={{
                color: TONE.text3,
                fontSize: 9.5,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              tools · existing Lv2 wrapped
            </div>
            <div>chirashi.fetch</div>
            <div>chirashi.analyze</div>
            <div>stores.search</div>
            <div>
              stores.apply_change <span style={{ color: 'var(--accent)' }}>· HITL</span>
            </div>
            <div>prices.upsert</div>
          </div>
        </div>
        <YmArrow />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <YmNode kind="default" label="Gemini 3.0 Flash" sub="画像解析" />
          <YmNode kind="default" label="Claude Sonnet 4.6" sub="resolve · 管理者 Chat" />
          <YmNode kind="dashed" label="Claude Opus 4.7" sub="難ケース · Extended Thinking" />
          <YmNode kind="muted" label="Langfuse" sub="LLM 呼び出しトレース" tag="obs" />
        </div>
      </div>

      <div
        className="ym-mcp-principles"
        style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
        }}
      >
        {MCP_PRINCIPLES.map(([k, v]) => (
          <div
            key={k}
            style={{
              background: TONE.surfaceMuted,
              border: `1px solid ${TONE.lineSoft}`,
              borderRadius: 10,
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500, color: TONE.text0, marginBottom: 6 }}>
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
   SECTION C — Scraping Pipeline
   =========================================================== */
const SCRAPE_STEPS: { n: string; k: NodeKind; label: string; sub: string }[] = [
  { n: '01', k: 'muted', label: 'Cloud Scheduler / 管理画面', sub: '日次 03:00 JST または手動起動' },
  { n: '02', k: 'default', label: 'Cloud Run Job · scrape', sub: 'yasui-mise-batch-scrape' },
  {
    n: '03',
    k: 'accent',
    label: 'ChainFetcher × N',
    sub: 'leaflet 画像を Base64 化 · 店舗別',
  },
  {
    n: '04',
    k: 'accent',
    label: 'GeminiAnalyzer → Gemini 3.0 Flash',
    sub: 'ScrapedPrice 配列 (name · origin · category · unit · price)',
  },
  { n: '05', k: 'default', label: 'DB Upsert', sub: 'generic_products → products → prices' },
  { n: '06', k: 'output', label: 'PostgreSQL', sub: "source='scrape' で由来を保持" },
];

function YmScraping() {
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
        className="ym-scrape-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: 36,
          alignItems: 'start',
        }}
      >
        {/* steps column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            position: 'relative',
          }}
        >
          {SCRAPE_STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                display: 'flex',
                alignItems: 'stretch',
                gap: 14,
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: TONE.text3,
                  width: 26,
                  paddingTop: 12,
                }}
              >
                {s.n}
              </span>
              <div style={{ flex: 1 }}>
                <YmNode kind={s.k} label={s.label} sub={s.sub} />
              </div>
            </div>
          ))}
        </div>

        {/* side annotations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Fallback
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11.5,
                color: TONE.text1,
                lineHeight: 1.7,
                padding: '12px 14px',
                background: TONE.surfaceMuted,
                border: `1px solid ${TONE.lineSoft}`,
                borderRadius: 10,
              }}
            >
              <div style={{ color: TONE.text3, marginBottom: 6 }}>{'// 失敗時の挙動'}</div>
              <div>
                fetch 失敗 → <span style={{ color: 'var(--accent)' }}>dummy</span>
              </div>
              <div>
                vertex 未認証 → <span style={{ color: 'var(--accent)' }}>dummy</span>
              </div>
              <div style={{ color: TONE.text3, marginTop: 6 }}>専用リトライ Q は未実装</div>
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Rate limit
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11.5,
                color: TONE.text1,
                lineHeight: 1.7,
                padding: '12px 14px',
                background: TONE.surfaceMuted,
                border: `1px solid ${TONE.lineSoft}`,
                borderRadius: 10,
              }}
            >
              <div>
                画像 max <span style={{ color: 'var(--accent)' }}>3</span> / 店舗
              </div>
              <div>
                request gap <span style={{ color: 'var(--accent)' }}>5s</span>
              </div>
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Cache
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11.5,
                color: TONE.text1,
                lineHeight: 1.7,
                padding: '12px 14px',
                background: TONE.surfaceMuted,
                border: `1px solid ${TONE.lineSoft}`,
                borderRadius: 10,
              }}
            >
              <div>chirashi_analyses</div>
              <div style={{ color: TONE.text3 }}>image_url 単位で Gemini 出力を再利用</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   SECTION D — Store Collection (5 phases)
   =========================================================== */
const PHASES: { n: string; id: string; name: string; desc: string; out: string }[] = [
  {
    n: '①',
    id: 'discover',
    name: 'discover',
    desc: '格子状検索セルで Places Nearby を叩き、新規 place を raw_places に upsert。',
    out: 'raw_places · last_run_id',
  },
  {
    n: '②',
    id: 'enrich',
    name: 'enrich',
    desc: 'Places Details で住所・営業状態・電話を補強。30日 TTL で再 enrich。',
    out: 'raw_places · enriched_at',
  },
  {
    n: '③',
    id: 'resolve',
    name: 'resolve',
    desc: 'chain-profiles に namePatterns 照合 → strategy 実行 → Jaro-Winkler + 距離で confidence。',
    out: 'resolved / review / below',
  },
  {
    n: '④',
    id: 'persist',
    name: 'persist',
    desc: 'raw_places ↔ stores 照合し 7 種の action に分類。--apply 時のみ TX で書き込み。',
    out: 'NEW · UPDATE · CLOSED · REVIEW · SKIP×3',
  },
  {
    n: '⑤',
    id: 'report',
    name: 'report',
    desc: 'CLI / Scheduler は Slack 通知、UI 起動はコンソールのみ (suppressSlack)。',
    out: 'summary',
  },
];

const CONFIDENCE_LADDER: { range: string; label: string; note: string; accent?: boolean }[] = [
  { range: '≥ 0.9', label: 'resolved', note: 'stores へ反映候補', accent: true },
  { range: '0.7 – 0.9', label: 'review', note: '人間レビュー待ち' },
  { range: '< 0.7', label: 'below', note: '破棄 / 次 run 再評価' },
];

const COLLECT_PRINCIPLES: [string, string][] = [
  ['冪等', 'フェーズ間で raw_places を中間成果物として持ち、部分再実行を許容。'],
  ['HITL', 'cron は dry-run のみ。--apply は人間が叩く。'],
  ['保護', "manual_override=true は一切上書きしない。閉店は status='closed' で論理削除。"],
];

function YmStoreCollect() {
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
        className="ym-phases"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 12,
          marginBottom: 32,
          position: 'relative',
        }}
      >
        {PHASES.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'relative',
              padding: '16px 16px',
              background: TONE.surfaceMuted,
              border: `1px solid ${TONE.lineSoft}`,
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {p.n}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: TONE.text3,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                phase
              </span>
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: TONE.text0,
                letterSpacing: '-0.01em',
              }}
            >
              {p.name}
            </div>
            <div style={{ fontSize: 12.5, color: TONE.text1, lineHeight: 1.55 }}>{p.desc}</div>
            <div
              style={{
                marginTop: 'auto',
                paddingTop: 8,
                borderTop: `1px dashed ${TONE.lineSoft}`,
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                color: TONE.text2,
                letterSpacing: '0.02em',
              }}
            >
              ↳ {p.out}
            </div>
          </div>
        ))}
      </div>

      {/* resolve detail — confidence ladder */}
      <div style={{ marginBottom: 28 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          ③ resolve · confidence ladder
        </div>
        <div
          className="ym-conf"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}
        >
          {CONFIDENCE_LADDER.map((r) => (
            <div
              key={r.label}
              style={{
                padding: '14px 16px',
                background: r.accent ? 'rgba(var(--accent-rgb), 0.08)' : TONE.surfaceMuted,
                border: `1px solid ${
                  r.accent ? 'rgba(var(--accent-rgb), 0.4)' : TONE.lineSoft
                }`,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: r.accent ? 'var(--accent)' : TONE.text2,
                  marginBottom: 4,
                }}
              >
                {r.range}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: TONE.text0,
                  letterSpacing: '-0.005em',
                }}
              >
                {r.label}
              </div>
              <div style={{ fontSize: 12, color: TONE.text2, marginTop: 2 }}>{r.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* principles */}
      <div
        className="ym-collect-principles"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}
      >
        {COLLECT_PRINCIPLES.map(([k, v]) => (
          <div
            key={k}
            style={{
              background: TONE.surfaceMuted,
              border: `1px solid ${TONE.lineSoft}`,
              borderRadius: 10,
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500, color: TONE.text0, marginBottom: 6 }}>
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
   SECTION E — Roadmap (9-card horizontal timeline)
   =========================================================== */
type RoadmapState = 'done' | 'active' | 'plan';

const ROADMAP: { p: string; title: string; week: string; state: RoadmapState }[] = [
  { p: '1', title: '基盤 + 基本機能', week: 'W1-3', state: 'done' },
  { p: '2', title: '認証 + ユーザー機能', week: 'W4-5', state: 'done' },
  { p: '3', title: '推移グラフ + 品質', week: 'W6-7', state: 'done' },
  { p: '4', title: '管理機能', week: 'W8-9', state: 'done' },
  { p: '5', title: 'CI/CD + 監視', week: 'W10', state: 'active' },
  { p: 'B', title: 'Web Push / LINE', week: '+1-3 mo', state: 'plan' },
  { p: 'C', title: 'ネイティブ化', week: '+6-12 mo', state: 'plan' },
  { p: 'D', title: '買物最適化 AI', week: '+12+ mo', state: 'plan' },
  { p: 'E', title: 'B2B データ API', week: '+12-18 mo', state: 'plan' },
];

const ROADMAP_STATE: Record<
  RoadmapState,
  { c: string; dot: string; label: string; dashed?: boolean }
> = {
  done: { c: TONE.text2, dot: TONE.text3, label: 'done' },
  active: { c: 'var(--accent)', dot: 'var(--accent)', label: 'active' },
  plan: { c: TONE.text3, dot: TONE.text3, label: 'plan', dashed: true },
};

function YmRoadmap() {
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
        className="ym-roadmap"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gap: 8,
          position: 'relative',
        }}
      >
        {ROADMAP.map((ph) => {
          const s = ROADMAP_STATE[ph.state];
          return (
            <div
              key={ph.p}
              style={{
                padding: '12px 12px 14px',
                background:
                  ph.state === 'active' ? 'rgba(var(--accent-rgb), 0.08)' : TONE.surfaceMuted,
                border: `1px ${s.dashed ? 'dashed' : 'solid'} ${
                  ph.state === 'active' ? 'rgba(var(--accent-rgb), 0.4)' : TONE.lineSoft
                }`,
                borderRadius: 10,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    color: ph.state === 'active' ? 'var(--accent)' : TONE.text0,
                    lineHeight: 1,
                  }}
                >
                  {ph.p}
                </span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: s.dot,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: TONE.text0,
                  lineHeight: 1.35,
                  marginBottom: 4,
                }}
              >
                {ph.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  color: TONE.text3,
                  letterSpacing: '0.04em',
                }}
              >
                {ph.week}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: TONE.text2,
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span>
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: 999,
              background: TONE.text3,
              marginRight: 6,
              transform: 'translateY(-1px)',
            }}
          />
          done · MVP 1-4
        </span>
        <span>
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: 999,
              background: 'var(--accent)',
              marginRight: 6,
              transform: 'translateY(-1px)',
            }}
          />
          active · 仕上げ中
        </span>
        <span>
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: 999,
              background: TONE.text3,
              marginRight: 6,
              transform: 'translateY(-1px)',
              outline: `1px dashed ${TONE.text3}`,
            }}
          />
          plan · 公開後
        </span>
      </div>
    </div>
  );
}

/* ===========================================================
   Deep dive — composed section
   =========================================================== */
export function YasuiMiseDeepDive() {
  return (
    <section style={{ padding: '32px 0 96px', borderTop: '1px solid var(--d-line)' }}>
      <div className="container">
        <div data-reveal style={{ marginBottom: 56, maxWidth: 720 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Deep dive · System Design
          </div>
          <h2 className="h-section" style={{ fontSize: 'clamp(28px, 3.4vw, 42px)' }}>
            アーキテクチャ・Agent・運用バッチ。
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
            企画から運用までの設計判断をいくつか抜粋しました。
            システム構成、Agent の段階設計、チラシ解析、店舗収集バッチ、そして全体ロードマップ。
          </p>
        </div>

        <div style={{ marginBottom: 72 }}>
          <YmHead
            idx="A"
            eyebrow="System Architecture"
            title="Cloud Run · Vertex AI · Firebase の最小スタック。"
            lede="Service + Jobs を Cloud Run に寄せ、認証は FE/BE で責任を分け、AI は Vertex AI で揃える。1人で運用しきれる構成に絞っています。"
          />
          <YmArch />
        </div>

        <div style={{ marginBottom: 72 }}>
          <YmHead
            idx="B"
            eyebrow="Agent Architecture"
            title="Lv1 → Lv4 への段階設計と、MCP に寄せた基盤。"
            lede="既存のスクレイパー (Lv2) を壊さず、Lv3-4 で必要なときに LLM を被せる。クライアント (バッチ / Desktop / 管理画面 Chat) は MCP を共有する設計に揃えています。"
          />
          <YmAgents />
        </div>

        <div style={{ marginBottom: 72 }}>
          <YmHead
            idx="C"
            eyebrow="Scraping Pipeline"
            title="チラシ画像から Gemini で構造化、DB に upsert。"
            lede="Scheduler → Job → Fetch → Gemini 解析 → Upsert の単線パイプライン。失敗時は dummy にフォールバックし、同一画像は chirashi_analyses でキャッシュ。"
          />
          <YmScraping />
        </div>

        <div style={{ marginBottom: 72 }}>
          <YmHead
            idx="D"
            eyebrow="Store Collection Batch"
            title="discover → enrich → resolve → persist → report。"
            lede="店舗マスタを自動収集する 5 フェーズの冪等バッチ。confidence で resolved / review / below に分け、書き込みは必ず人間の --apply 経由。"
          />
          <YmStoreCollect />
        </div>

        <div>
          <YmHead
            idx="E"
            eyebrow="Roadmap"
            title="MVP 10 週 + 公開後 Phase B-E。"
            lede="MVP は基盤 → 認証 → 推移 → 管理 → デプロイの 5 Phase に分割し、公開後は Push / ネイティブ化 / AI / B2B API の順で拡張する計画。"
          />
          <YmRoadmap />
        </div>
      </div>
    </section>
  );
}
