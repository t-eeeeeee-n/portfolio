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
        usedIn: ['kairi', 'specpilot', 'cm-agent', 'yasui-mise'],
        note: 'App Router で全プロジェクトのフロントを構築',
        years: 3,
      },
      {
        name: 'TypeScript',
        level: 'primary',
        usedIn: ['kairi', 'specpilot', 'cm-agent', 'yasui-mise'],
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
      {
        name: 'Nuxt.js',
        level: 'normal',
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
        usedIn: ['kairi', 'cm-agent'],
        note: 'kairi の解析・CLI 本体と、PoC の API + Agent サーバ',
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
        note: 'tRPC と組み合わせた薄い API 層',
      },
      {
        name: 'PostgreSQL',
        level: 'primary',
        usedIn: ['yasui-mise', 'specpilot', 'cm-agent'],
        note: 'Prisma / SQLAlchemy 経由で 3 案件のデータ層を設計',
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
        usedIn: ['yasui-mise', 'specpilot', 'cm-agent'],
        aliases: ['Google Cloud'],
        note: 'Cloud Run + Cloud SQL + Vertex AI の構成を構築',
      },
      {
        name: 'Cloud Run',
        level: 'primary',
        usedIn: ['yasui-mise', 'cm-agent'],
        note: '一人で回しても頭に入るスタックを優先',
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
        usedIn: ['specpilot', 'cm-agent', 'kairi'],
        aliases: ['Claude', 'Claude Code'],
        note: 'Gemini と差し替えられる provider 抽象の裏で利用',
      },
      {
        name: 'OpenAI API',
        level: 'normal',
        usedIn: ['specpilot'],
        aliases: ['GPT-4o'],
        note: 'provider 抽象の差し替え先として実装',
      },
      {
        name: 'Gemini',
        level: 'primary',
        usedIn: ['kairi', 'specpilot', 'yasui-mise'],
        note: 'チラシ OCR と、SpecPilot・kairi の既定モデル',
      },
      {
        name: 'Vertex AI',
        level: 'primary',
        usedIn: ['kairi', 'specpilot', 'yasui-mise'],
        note: 'LLM 呼び出しの認証・課金を GCP に集約',
      },
      {
        name: 'AI Agent',
        level: 'primary',
        usedIn: ['specpilot', 'cm-agent'],
        note: 'マルチエージェント基盤と I/O コントラクトの設計',
      },
      {
        name: 'Mastra',
        level: 'secondary',
        note: 'SpecPilot で 3 回スパイクし、純益が薄いため不採用と判断',
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
        usedIn: ['kairi', 'specpilot', 'cm-agent', 'yasui-mise'],
        note: 'ローカル開発から配布まで同じコンテナで揃える',
        years: 3,
      },
      {
        name: 'Docker Compose',
        level: 'normal',
        usedIn: ['yasui-mise', 'specpilot', 'cm-agent'],
        note: 'frontend / backend / db / proxy のサービス統合',
        years: 3,
      },
      { name: 'GitHub Actions', level: 'normal', note: 'CI / 型チェック / Lint の自動化' },
      { name: 'Sentry', level: 'normal', note: 'エラートラッキング基盤' },
    ],
  },
];
