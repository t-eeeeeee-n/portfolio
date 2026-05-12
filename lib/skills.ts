import type { ProjectSlug } from './projects';

export type SkillLevel = 'primary' | 'normal' | 'secondary';

export type SkillDomain =
  | 'Frontend'
  | 'Backend'
  | 'Infrastructure'
  | 'AI / LLM'
  | 'DevOps';

export type Skill = {
  name: string;
  level: SkillLevel;
  usedIn?: ProjectSlug[];
  note?: string;
  /** Years of experience. Manual override. If absent, /skill-sheet
   *  derives years from projectHistory via deriveSkillYears(). */
  years?: number;
  /** Self-rated 1–5 proficiency for /skill-sheet. If absent, the
   *  page derives: primary → 4, normal → 3, secondary → 2. */
  proficiency?: 1 | 2 | 3 | 4 | 5;
  /** Alternate stack names that should count as this skill in
   *  projectHistory[].stack lookups. e.g. PDF lists "Google Cloud"
   *  where this site says "GCP". Only used on /skill-sheet. */
  aliases?: string[];
};

export type SkillCategory = {
  domain: SkillDomain;
  meta: string;
  items: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    domain: 'Frontend',
    meta: 'UI / 画面設計',
    items: [
      {
        name: 'Next.js',
        level: 'primary',
        usedIn: ['yasui-mise', 'specpilot', 'cm-agent'],
        note: 'App Router で全プロジェクトのフロントを構築',
        years: 3,
      },
      {
        name: 'TypeScript',
        level: 'primary',
        usedIn: ['yasui-mise', 'specpilot', 'cm-agent'],
        note: '型を Single Source of Truth に据える設計を徹底',
        years: 3,
      },
      {
        name: 'React',
        level: 'normal',
        note: 'Server / Client Components の使い分けを意識した実装',
        years: 3,
      },
      {
        name: 'Tailwind CSS',
        level: 'normal',
        note: 'デザイントークンを CSS 変数で持って Tailwind から参照',
        years: 3,
      },
      { name: 'Vue', level: 'secondary' },
      { name: 'jQuery', level: 'secondary' },
    ],
  },
  {
    domain: 'Backend',
    meta: 'API / データ層',
    items: [
      {
        name: 'Python',
        level: 'primary',
        usedIn: ['cm-agent'],
        note: 'PoC の API + Agent サーバ実装',
      },
      {
        name: 'FastAPI',
        level: 'primary',
        usedIn: ['cm-agent'],
        note: 'OpenAPI コードファースト設計の起点',
      },
      {
        name: 'Hono',
        level: 'primary',
        usedIn: ['specpilot'],
        note: 'Edge ランタイム前提の薄い API 層',
      },
      {
        name: 'PostgreSQL',
        level: 'primary',
        usedIn: ['yasui-mise', 'specpilot', 'cm-agent'],
        note: 'Prisma / SQLAlchemy 経由で 3 案件すべて運用',
      },
      {
        name: 'NestJS',
        level: 'normal',
        usedIn: ['yasui-mise'],
        note: 'ヤスイミセの API 層を構築',
      },
      {
        name: 'Express',
        level: 'normal',
        years: 3,
        note: 'Node.js / 認証基盤・API 実装',
      },
      { name: 'tRPC', level: 'normal' },
      { name: 'Prisma', level: 'normal' },
      {
        name: 'OpenAPI',
        level: 'normal',
        usedIn: ['yasui-mise', 'cm-agent'],
        note: 'orval で型安全な SDK を自動生成',
      },
      { name: 'REST', level: 'normal' },
      { name: 'Java', level: 'secondary' },
      { name: 'Spring', level: 'secondary' },
      { name: 'Oracle', level: 'secondary' },
      { name: 'Visual Basic .NET', level: 'secondary' },
    ],
  },
  {
    domain: 'Infrastructure',
    meta: 'クラウド / 実行環境',
    items: [
      {
        name: 'GCP',
        level: 'primary',
        usedIn: ['yasui-mise', 'cm-agent'],
        aliases: ['Google Cloud'],
        note: 'Cloud Run + Cloud SQL + Vertex AI で運用',
      },
      {
        name: 'Cloud Run',
        level: 'primary',
        usedIn: ['yasui-mise', 'cm-agent'],
        note: '一人で運用しても頭に入るスタックを優先',
      },
      { name: 'Cloud SQL', level: 'normal' },
      { name: 'AWS', level: 'secondary' },
    ],
  },
  {
    domain: 'AI / LLM',
    meta: 'AI Agent / 生成 AI 統合',
    items: [
      {
        name: 'Claude API',
        level: 'primary',
        usedIn: ['specpilot', 'cm-agent'],
        aliases: ['Claude', 'Claude Code'],
        note: '抽出・推論系の主力モデルとして採用',
      },
      {
        name: 'GPT-4o',
        level: 'primary',
        usedIn: ['specpilot'],
        note: '探索的タスクで使い分け',
      },
      {
        name: 'Gemini',
        level: 'primary',
        usedIn: ['yasui-mise', 'specpilot'],
        note: 'チラシ OCR / 長文整理で活用',
      },
      {
        name: 'Vertex AI',
        level: 'primary',
        usedIn: ['yasui-mise'],
        note: '商品データ解析と OCR のホスティング',
      },
      {
        name: 'AI Agent',
        level: 'primary',
        usedIn: ['specpilot', 'cm-agent'],
        note: 'マルチエージェント基盤と I/O コントラクトの設計',
      },
      {
        name: 'Mastra',
        level: 'primary',
        usedIn: ['specpilot'],
        note: 'Agent 抽象化レイヤとして採用',
      },
    ],
  },
  {
    domain: 'DevOps',
    meta: 'CI / 監視 / 品質',
    items: [
      {
        name: 'Docker',
        level: 'normal',
        usedIn: ['yasui-mise', 'specpilot', 'cm-agent'],
        note: 'ローカル〜本番まで一貫したコンテナ運用',
      },
      { name: 'GitHub Actions', level: 'normal', note: 'CI / 型チェック / Lint の自動化' },
      { name: 'Sentry', level: 'normal', note: 'エラートラッキング基盤' },
    ],
  },
];
