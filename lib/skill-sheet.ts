/* Data layer for /skill-sheet — the dense Findy-style profile page.
   Profile metadata is kept inline (not in identity.json) because
   the skill sheet needs richer fields than the About card. Project
   history is the full historical list (all employers / all
   projects), grouped by company. Featured projects (cm-agent /
   specpilot / yasui-mise) reuse data from lib/projects.ts; all
   other entries carry their own description / stack inline. */

import type { ProjectSlug } from './projects';
import type { Skill } from './skills';

export type SkillSheetProfile = {
  nameJa: string;
  nameKana: string;
  nameEn: string;
  role: string;
  base: string;
  email: string;
  github: string;
  portfolio: string;
  availability: string;
  engagements: string[];
  languages: string[];
  /** ISO date string, e.g., '2026-05-12'. */
  updated: string;
};

export const skillSheetProfile: SkillSheetProfile = {
  nameJa: '荒井天匠',
  nameKana: 'アライ テンショウ',
  nameEn: 'Tensho Arai',
  role: 'Full-Stack / Product Engineer',
  base: 'Tokyo, Japan',
  email: 't.eeee.n.nir@gmail.com',
  github: 'https://github.com/t-eeeeeee-n',
  portfolio: 'https://teeeen.vercel.app',
  availability: '副業 / 業務委託 受付中',
  engagements: ['副業', '業務委託', '技術顧問', 'スポット相談'],
  languages: ['日本語 (native)', 'English (technical)'],
  updated: '2026-05-12',
};

export const workPhases = [
  '要件定義',
  '基本設計',
  '詳細設計',
  '実装',
  '単体テスト',
  '結合テスト',
  '総合テスト',
  '保守運用',
] as const;

export type WorkPhase = (typeof workPhases)[number];

export type Company = {
  id: string;
  name: string;
  period: string;
  employment: string;
};

export const companies: Company[] = [
  {
    id: 'itize',
    name: '株式会社アイタイズ',
    period: '2024年01月～現在',
    employment: '正社員',
  },
  {
    id: 'dym',
    name: '株式会社DYM',
    period: '2023年02月～2023年12月',
    employment: '正社員',
  },
  {
    id: 'axis',
    name: '株式会社AXIS',
    period: '2020年07月～2023年02月',
    employment: '正社員',
  },
];

export type ProjectHistoryEntry = {
  id: string;
  companyId: string;
  /** If true, render with arch-frame chrome + full body. */
  featured?: boolean;
  /** Optional link to lib/projects.ts data (only featured). */
  slug?: ProjectSlug;
  name: string;
  period: string;
  position: string;
  teamRole?: string;
  teamSize: string;
  industry?: string;
  phases: readonly WorkPhase[];
  stack: string[];
  description: string;
  highlights?: string[];
};

/* Sorted from most recent to oldest within each company. Featured 3
   first by visual priority, then the rest of the most recent employer,
   then back through history. */
export const projectHistory: ProjectHistoryEntry[] = [
  // ── 株式会社アイタイズ ─────────────────────────────────
  {
    id: 'yasui-mise',
    companyId: 'itize',
    featured: true,
    slug: 'yasui-mise',
    name: 'スーパーマーケット価格比較Webサービス「ヤスイミセ」',
    period: '2026年03月～現在',
    position: 'フルスタックエンジニア',
    teamSize: '1 名（個人開発）',
    industry: '小売 / 価格情報サービス',
    phases: ['要件定義', '基本設計', '詳細設計', '実装', '単体テスト', '結合テスト', '保守運用'],
    stack: ['PostgreSQL', 'Docker', 'Node.js', 'Google Cloud', 'TypeScript', 'Next.js', 'NestJS', 'Docker Compose'],
    description:
      '複数のスーパーの価格を比較し「どこで買えば一番安いか」を直感的に判断できるサービスを、企画立案から設計・実装・運用まで一人で担当。',
    highlights: [
      'サービス企画・要件定義（ターゲット選定、MVP スコープ策定、マネタイズ戦略立案）',
      'UI/UX 設計（デザインシステム策定、ワイヤーフレーム）',
      'DB 設計（ER 図設計、インデックス設計、RLS）',
      'API 設計・実装（REST、OpenAPI 自動生成、orval による型安全なクライアント連携）',
      'フロントエンド実装（App Router、Server Components、TanStack Query）',
      'Vertex AI / Gemini による商品データ解析・チラシ OCR',
      '価格データ収集基盤（スクレイピング、進捗管理・再開機構）',
      'GCP インフラ構築（Cloud Run、Cloud SQL、Artifact Registry、Secret Manager）',
      'CI/CD（GitHub Actions + Workload Identity Federation）',
      '監視・エラートラッキング（Sentry、Cloud Error Reporting）',
    ],
  },
  {
    id: 'specpilot',
    companyId: 'itize',
    featured: true,
    slug: 'specpilot',
    name: 'SpecPilot — AI 設計支援 SaaS',
    period: '2026年03月～現在',
    position: 'フルスタックエンジニア',
    teamSize: '1 名（個人開発）',
    industry: 'SaaS / 受託開発支援',
    phases: ['要件定義', '基本設計', '詳細設計', '実装'],
    stack: ['PostgreSQL', 'Docker', 'TypeScript', 'Next.js', 'Prisma', 'Stripe', 'Docker Compose', 'Claude', 'Gemini', 'Claude Code', 'Mastra'],
    description:
      '受託開発の上流工程（要件整理〜基本設計）に特化した AI 設計支援 SaaS。議事録から AI Agent パイプラインで仕様の不足・矛盾・未決事項を質問形式で収束させ、vibe coding にそのまま渡せる「vibe pack」（設計書 + Lint 結果 + 雛形）を生成。',
    highlights: [
      '企画・コンセプト設計、ターゲット顧客とマネタイズ設計（GTM・課金モデル・LTV 試算）',
      '全体アーキテクチャ設計（モノレポ構成、Agent パイプライン、データモデル、RBAC、認証・課金フロー）',
      'AI Agent パイプライン設計（Mastra ベースで Extractor / Question / Designer / Linter を構成）',
      'Claude API・GPT-4o・Gemini を用途別に使い分け',
      '型を Source of Truth として運用（Hono + tRPC、OpenAPI は Lint 参照のみ）',
      '認証（JWT + httpOnly Cookie）、決済（Stripe Checkout / Portal / Webhook）',
      'ドキュメント駆動開発（意思決定ログ D-XXXX / ADR の継続的整備）',
    ],
  },
  {
    id: 'cm-agent',
    companyId: 'itize',
    featured: true,
    slug: 'cm-agent',
    name: '放送局向け CMスポット枠 自動編集支援エージェント (PoC)',
    period: '2025年10月～2026年02月',
    position: 'フルスタックエンジニア',
    teamRole: 'リーダー',
    teamSize: '1-10 名',
    industry: '放送 / メディア',
    phases: ['要件定義', '基本設計', '詳細設計', '実装', '単体テスト', '結合テスト'],
    stack: ['Python', 'PostgreSQL', 'Docker', 'TypeScript', 'Next.js', 'OpenAPI', 'Docker Compose', 'Tailwind CSS', 'FastAPI', 'AI Agent', 'Claude Code', 'Agent Development Kit'],
    description:
      '放送局の営放（営業放送）システムにおける、CMスポット枠の編集・最適化作業を自動化する社内 PoC。マルチエージェント構成（Google ADK / A2A Protocol）で属人化の解消と作業効率化を目指した。Human-in-the-Loop で編集案を提示し、オペレーターが承認するワークフロー。',
    highlights: [
      'マルチエージェント基盤の設計・実装（Main Agent + 6 Sub Agent のラウンドトリップ構成）',
      'Sub Agent（data_provider / allocator / reorderer / scorer / formatter / notifier）の I/O コントラクト設計',
      'FastAPI による OpenAPI コードファースト設計、Orval による TypeScript SDK 自動生成パイプライン',
      'W3C Trace Context によるフロント〜バックエンド〜エージェント間の trace_id 伝播設計',
      '構造化 JSON ログ基盤の整備（span_id / agent_name / model を必須項目化）',
      'Registry/Pipeline 構成で仕様変更頻発下でも責務差し替えを容易に',
      'PLAN → DIFF → COMMANDS → VERIFICATION の段階的開発フロー設計',
    ],
  },
  {
    id: 'public-race',
    companyId: 'itize',
    name: '公営競技向け基盤システム刷新',
    period: '2025年04月～2025年09月',
    position: 'フロントエンドエンジニア',
    teamRole: 'メンバー',
    teamSize: '1-10 名',
    industry: '公営競技',
    phases: ['基本設計', '詳細設計', '実装'],
    stack: ['Vue', 'Figma'],
    description:
      'フロントエンド領域におけるモックアップ開発を担当。Web デザイナーと協業し、UI/UX 設計から画面実装まで推進。SPO でのコンポーネント設計に参画し、再利用可能な設計方針を策定。デザインシステムを意識したコンポーネント分割・設計を実施。',
  },
  {
    id: 'rating-ai',
    companyId: 'itize',
    name: '放送局 視聴率分析 AI システム',
    period: '2024年03月～2025年03月',
    position: 'フロントエンドエンジニア',
    teamSize: '—',
    industry: '放送 / メディア',
    phases: ['詳細設計', '実装', '単体テスト', '保守運用'],
    stack: ['Java', 'JavaScript', 'HTML', 'jQuery', 'Spring'],
    description:
      '視聴率分析システムにおけるフロントエンド改修を担当。UI の表示ずれ修正や既存機能の改善対応を実施。画面表示・操作性に関する不具合修正を行い、ユーザビリティ向上に貢献。既存コードを踏まえた保守・運用改善を担当。',
  },
  {
    id: 'restaurant-search',
    companyId: 'itize',
    name: '飲食店検索ツール',
    period: '2024年08月～2024年12月',
    position: 'フルスタックエンジニア',
    teamSize: '1-10 名',
    industry: 'Web / Android',
    phases: ['要件定義', '基本設計', '詳細設計', '実装', '単体テスト'],
    stack: ['Python', 'Docker', 'TypeScript', 'Next.js', 'Prisma', 'Docker Compose', 'Tailwind CSS', 'FastAPI'],
    description:
      '「エリア検索」「現在地検索（Geolocation API）」の 2 導線をユーザーが迷わず選べる画面遷移を設計。Next.js App Router でサーバーアクション・Route Handler を併用、FastAPI で HotPepper / 食べログ用のサービス層を分離。Basic 認証 / IP 制限ミドルウェアを自前実装、docker-compose で frontend / backend / db / https-portal の 4 サービスを統合、本番環境で TLS 終端まで自動化。Qodana を導入し PR ごとに静的解析を実行。',
  },
  {
    id: 'cm-contract',
    companyId: 'itize',
    name: '放送局 CM契約情報管理システム',
    period: '2024年01月～2024年04月',
    position: 'フルスタックエンジニア',
    teamSize: '—',
    industry: '放送 / メディア',
    phases: ['詳細設計', '実装'],
    stack: ['Python', 'AWS', 'Docker', 'Node.js', 'TypeScript', 'Express', 'Vue'],
    description:
      '認証機能の実装を担当。Amazon Cognito を利用した認証・認可処理を構築。ログインフローやセッション管理を含む認証基盤の実装を実施。セキュリティ・運用性を考慮した認証設計を推進。',
  },

  // ── 株式会社DYM ────────────────────────────────────────
  {
    id: 'kbox-mail',
    companyId: 'dym',
    name: '求人ボックス 応募メール送信システム構築',
    period: '2023年02月～2023年12月',
    position: 'バックエンドエンジニア',
    teamSize: '1-10 名',
    industry: 'HR / 求人',
    phases: ['詳細設計', '実装'],
    stack: ['Python', 'AWS', 'Google Cloud'],
    description:
      '求人ボックスへの応募を検知し、応募通知メールを顧客ごとに送信するシステムの構築。',
  },
  {
    id: 'kbox-ats',
    companyId: 'dym',
    name: '求人ボックス ATS転記システム構築',
    period: '2023年02月～2023年12月',
    position: 'バックエンドエンジニア',
    teamRole: 'メンバー',
    teamSize: '1-10 名',
    industry: 'HR / 求人',
    phases: ['詳細設計', '実装'],
    stack: ['Python', 'AWS', 'Google Cloud'],
    description:
      '求人ボックスへの応募を検知し、ATS サイトに転記するシステムを構築。',
  },
  {
    id: 'kbox-rpa',
    companyId: 'dym',
    name: '求人ボックス 広告運用の RPA 構築',
    period: '2023年02月～2023年12月',
    position: 'バックエンドエンジニア',
    teamSize: '1-10 名',
    industry: 'HR / 広告運用',
    phases: ['要件定義', '基本設計', '詳細設計', '実装', '保守運用'],
    stack: ['Python', 'AWS', 'Google Cloud'],
    description:
      'カカクコム社の求人ボックスという広告媒体の運用のためのシステム。求人データを 10 倍、100 倍に複製し、求人ボックスに登録する RPA を構築。企画から、開発、保守まで担当。',
  },

  // ── 株式会社AXIS ───────────────────────────────────────
  {
    id: 'form-digitization',
    companyId: 'axis',
    name: '放送局 帳票電子化システム更新',
    period: '2022年07月～2023年02月',
    position: 'バックエンドエンジニア',
    teamRole: 'メンバー',
    teamSize: '50-100 名',
    industry: '放送 / メディア',
    phases: ['要件定義', '詳細設計', '実装', '単体テスト', '結合テスト', '総合テスト'],
    stack: ['Java', 'PostgreSQL'],
    description:
      '紙帳票削減に向けてのリプレース。要件定義、詳細設計、開発、単体テスト、結合テスト、総合テストまでを担当。',
  },
  {
    id: 'own-hp',
    companyId: 'axis',
    name: '自社ホームページ開発',
    period: '2021年06月～2022年06月',
    position: 'フロントエンドエンジニア',
    teamRole: 'メンバー',
    teamSize: '1-10 名',
    industry: 'コーポレートサイト',
    phases: ['基本設計', '詳細設計', '実装', '単体テスト'],
    stack: ['JavaScript', 'CSS', 'HTML'],
    description:
      'デザインからプログラミング、テストまで全て担当。',
  },
  {
    id: 'broadcast-core',
    companyId: 'axis',
    name: '放送局 基幹システム更新',
    period: '2020年07月～2022年06月',
    position: 'フルスタックエンジニア',
    teamRole: 'メンバー（2022/01～2022/06 はリーダー）',
    teamSize: '100 名以上',
    industry: '放送 / メディア',
    phases: ['要件定義', '詳細設計', '実装', '単体テスト', '結合テスト', '総合テスト'],
    stack: ['Java', 'Visual Basic .NET', 'Linux', 'Oracle'],
    description:
      'アナログ廃止によるシステム更新と新規機能追加。要件定義、詳細設計、開発、単体テスト、結合テスト、総合テストまで担当。',
  },
  {
    id: 'reservation',
    companyId: 'axis',
    name: '放送局 会議室／リハ室／化粧室 予約システム',
    period: '2021年02月～2022年04月',
    position: 'フロントエンドエンジニア',
    teamRole: 'メンバー',
    teamSize: '1-10 名',
    industry: '放送 / メディア',
    phases: ['詳細設計', '実装', '単体テスト', '結合テスト'],
    stack: ['JavaScript', 'HTML', 'Google Cloud', 'Bootstrap'],
    description:
      '予約管理の新規システム構築。詳細設計、開発、単体テスト、結合テストまで担当。',
  },
];

/* Extra technologies from the PDF resume that aren't surfaced in
   lib/skills.ts (which is curated for the portfolio Skills section).
   Used on /skill-sheet only to maximize recruiter keyword match. */
export type ExtraSkillCategory =
  | 'Language'
  | 'Framework'
  | 'Database'
  | 'Cloud'
  | 'OS'
  | 'Tool';

export type ExtraSkill = {
  name: string;
  category: ExtraSkillCategory;
};

/* Auto-derive a "X 年" string for a skill by finding the earliest
   project (in projectHistory) that used it. Reference date is the
   skill-sheet "updated" field — so years are a snapshot frozen at
   the revision date rather than drifting with build time. */
function parseStartMonth(period: string): number | null {
  const m = period.match(/(\d{4})年(\d{1,2})月/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, 1).getTime();
}

function parseUpdatedDate(updated: string): number {
  const m = updated.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return Date.now();
  return new Date(
    Number(m[1]),
    Number(m[2]) - 1,
    Number(m[3])
  ).getTime();
}

export function deriveSkillYears(skill: Skill): string {
  // Explicit override always wins
  if (skill.years !== undefined) {
    return skill.years < 1 ? '1 年' : `${skill.years} 年`;
  }

  const matched = new Set<ProjectHistoryEntry>();

  // 1. usedIn → projectHistory.slug (precise link, featured projects only)
  skill.usedIn?.forEach((slug) => {
    const entry = projectHistory.find((p) => p.slug === slug);
    if (entry) matched.add(entry);
  });

  // 2. Name + aliases → projectHistory.stack[] (covers non-featured)
  const names = [skill.name, ...(skill.aliases ?? [])];
  projectHistory.forEach((p) => {
    if (names.some((n) => p.stack.includes(n))) {
      matched.add(p);
    }
  });

  if (matched.size === 0) return '—';

  const starts = Array.from(matched)
    .map((p) => parseStartMonth(p.period))
    .filter((m): m is number => m !== null);

  if (starts.length === 0) return '—';

  const earliest = Math.min(...starts);
  const reference = parseUpdatedDate(skillSheetProfile.updated);
  const months = (reference - earliest) / (1000 * 60 * 60 * 24 * 30.4);

  if (months < 12) return '1 年';
  return `${Math.round(months / 12)} 年`;
}

export const extraSkillCategories: { category: ExtraSkillCategory; label: string; items: string[] }[] = [
  {
    category: 'Language',
    label: 'プログラミング言語',
    items: ['Go', 'Rust', 'PHP', 'CSS', 'HTML'],
  },
  {
    category: 'Framework',
    label: 'フレームワーク / ライブラリ',
    items: ['Angular', 'Flask', 'Django', 'Bootstrap', 'Spring Boot', 'Nuxt.js', 'Astro'],
  },
  {
    category: 'Database',
    label: 'データベース',
    items: ['MySQL'],
  },
  {
    category: 'OS',
    label: 'OS / プラットフォーム',
    items: ['Linux'],
  },
  {
    category: 'Tool',
    label: 'ツール',
    items: ['npm', 'yarn'],
  },
];
